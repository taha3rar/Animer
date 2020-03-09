import { SpinnerToggleService } from './../../../shared/services/spinner-toggle.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';
import { User } from '@app/core/models/user/user';
import { QuoteRequestDataService } from '../quote-request-data.service';
import { SellerQuoteRequest } from '@app/core/models/quote-request/seller-quoteRequest';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuoteRequestService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';
import swal from 'sweetalert';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-quote-request-generator-suppliers',
  templateUrl: './quote-request-generator-suppliers.component.html',
  styleUrls: ['./quote-request-generator-suppliers.component.scss']
})
export class QuoteRequestGeneratorSuppliersComponent extends BaseValidationComponent implements OnInit {
  @Output() validQuoteRequest = new EventEmitter<Boolean>();
  toggledTable = 'clients';
  buyer_sellers: Client[];
  buyer_ecosystems: Ecosystem[];
  targeted_sellers: SellerQuoteRequest[];
  targeted_ecosytem_sellers: any[];
  quoteRequest: QuoteRequest = new QuoteRequest();
  pageClients = 1;
  pageEcosystems = 1;
  pageEcosystemSellers = 1;
  sellersSecOpened = false;

  constructor(
    private route: ActivatedRoute,
    private quoteRequestDataService: QuoteRequestDataService,
    private quoteRequestService: QuoteRequestService,
    private alerts: AlertsService,
    private router: Router,
    private spinnerToggleSerivce: SpinnerToggleService
  ) {
    super();
  }

  ngOnInit() {
    this.buyer_ecosystems = this.route.snapshot.data['ecosystems'];
    const buyer_clients = this.route.snapshot.data['clients'];
    this.buyer_sellers = buyer_clients.filter(function(buyer_client: Client) {
      return buyer_client.role !== 'buyer';
    });
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.quoteRequest = quoteRequest;
      if (this.quoteRequest.ecosystem_id) {
        this.toggledTable = 'ecosystems';
        const ecosystem_targeted = this.buyer_ecosystems.filter(ecosystems => {
          return ecosystems._id === this.quoteRequest.ecosystem_id;
        });
        this.pickEcosystem(ecosystem_targeted[0], true);
      }
      this.quoteRequest.sellers ? (this.targeted_sellers = this.quoteRequest.sellers) : (this.targeted_sellers = []);
    });
    if (this.toggledTable === 'ecosystems') {
      this.displayEcosystemSellers();
    }
  }

  toggleAlert(table: string): void {
    const thisClass = this;
    if (this.targeted_sellers.length > 0) {
      let target_description: string;
      table === 'clients' ? (target_description = 'one or more single users') : (target_description = 'an ecosystem');
      swal({
        title: 'You are about to send a Quote Request to ' + target_description,
        text: 'All of your pevious chosen clients will be deleted from the suppliers list',
        icon: 'info',
        buttons: {
          cancel: true,
          confirm: true
        }
      }).then(function(isConfirm: boolean) {
        if (isConfirm) {
          thisClass.toggleTable(table);
        }
      });
    } else {
      thisClass.toggleTable(table);
    }
  }

  pickEcosystem(ecosystem: Ecosystem, noUpdate?: boolean): void {
    this.quoteRequest.ecosystem_id = ecosystem._id;
    this.targeted_ecosytem_sellers = [];
    this.targeted_sellers = [];
    for (let i = 0; i < ecosystem.participants.length; i++) {
      this.targeted_ecosytem_sellers.push({
        _id: ecosystem.participants[i]._id,
        first_name: ecosystem.participants[i].first_name,
        last_name: ecosystem.participants[i].last_name,
        company_name: ecosystem.participants[i].company_name
      });
      if (!noUpdate) {
        this.targetSeller(ecosystem.participants[i], true);
      }
    }
    if (!noUpdate) {
      this.displayEcosystemSellers();
    }
  }

  targetSeller(seller: any, isChecked: Boolean): void {
    if (isChecked) {
      this.targeted_sellers.push({
        _id: seller._id,
        numericId: seller.numericId,
        first_name: seller.first_name,
        last_name: seller.last_name,
        company_name: seller.company_name,
        company_number: seller.company_number,
        phone_number: seller.phone_number,
        email: seller.email,
        address: seller.address,
        city: seller.city,
        country: seller.country,
        zipcode: seller.zipcode,
        contact_by: seller.contact_by
      });
    } else {
      const index = this.targeted_sellers.findIndex(x => x._id === seller._id);
      this.targeted_sellers.splice(index, 1);
    }
    this.updateQuoteRequest();
  }

  isPicked(ecosystem: Ecosystem): Boolean {
    if (this.quoteRequest.ecosystem_id) {
      return ecosystem._id === this.quoteRequest.ecosystem_id;
    } else {
      return false;
    }
  }

  isTargeted(seller: User): Boolean {
    if (this.targeted_sellers.length > 0) {
      return this.targeted_sellers.findIndex(x => x._id === seller._id) >= 0;
    } else {
      return false;
    }
  }

  disablingChoice(seller: User): Boolean {
    return this.isTargeted(seller) && this.targeted_sellers.length === 1;
  }

  toggleTable(table: string): void {
    this.targeted_sellers = [];
    this.quoteRequest.ecosystem_id = null;
    this.updateQuoteRequest();
    if (table === 'clients' && this.sellersSecOpened) {
      $('#ecosystem-sellers').hide();
      $('#suppliers-list').toggleClass('col-md-8 col-md-12');
      this.sellersSecOpened = false;
    }
    this.toggledTable = table;
  }

  draftQuoterequest() {
    this.disableSubmitButton(true);
    this.spinnerToggleSerivce.showSpinner();
    this.validQuoteRequest.emit(true);
    this.quoteRequestService.draft(this.quoteRequest).subscribe(
      quoteRequest => {
        this.spinnerToggleSerivce.hideSpinner();
        this.alerts.showAlert('Your quote request has been saved');
        this.router.navigateByUrl('/quote-request');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }

  displayEcosystemSellers() {
    if (this.sellersSecOpened) {
      $('#ecosystem-sellers').hide();
      $('#suppliers-list').toggleClass('col-md-8 col-md-12');

      setTimeout(function() {
        $('#suppliers-list').toggleClass('col-md-8 col-md-12');
      }, 300);

      setTimeout(function() {
        $('#ecosystem-sellers').show();
      }, 600);
    } else {
      $('#suppliers-list').toggleClass('col-md-12 col-md-8');
      setTimeout(function() {
        $('#ecosystem-sellers').show();
      }, 300);
    }
    this.sellersSecOpened = true;
  }

  updateQuoteRequest() {
    this.quoteRequest.sellers = this.targeted_sellers;
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }
}
