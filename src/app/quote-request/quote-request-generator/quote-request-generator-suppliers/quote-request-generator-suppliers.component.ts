import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';
import { User } from '@app/core/models/user/user';
import { QuoteRequestDataService } from '../quote-request-data.service';
import { SellerQuoteRequest } from '@app/core/models/quote-request/seller-quoteRequest';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuoteRequestService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';

@Component({
  selector: 'app-quote-request-generator-suppliers',
  templateUrl: './quote-request-generator-suppliers.component.html',
  styleUrls: ['./quote-request-generator-suppliers.component.scss']
})
export class QuoteRequestGeneratorSuppliersComponent implements OnInit {
  @Output() validQuoteRequest = new EventEmitter<Boolean>();
  toggledTable = 'clients';
  buyer_sellers: Client[];
  buyer_ecosystems: Ecosystem[];
  targeted_sellers: SellerQuoteRequest[];
  targeted_ecosystem = new Ecosystem();
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
    private router: Router
  ) {}

  ngOnInit() {
    this.buyer_ecosystems = this.route.snapshot.data['ecosystems'];
    const buyer_clients = this.route.snapshot.data['clients'];
    this.buyer_sellers = buyer_clients.filter(function(buyer_client: Client) {
      return buyer_client.role !== 'buyer';
    });
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.quoteRequest = quoteRequest;
      this.quoteRequest.sellers ? (this.targeted_sellers = this.quoteRequest.sellers) : (this.targeted_sellers = []);
    });
  }

  targetSeller(seller: any, isChecked: Boolean, singleSeller: Boolean): void {
    if (this.targeted_ecosystem && singleSeller) {
      this.targeted_ecosystem = undefined;
    }
    if (isChecked) {
      this.targeted_sellers.push({
        _id: seller._id,
        numericId: seller.numericId,
        first_name: seller.first_name,
        last_name: seller.last_name,
        company_name: seller.company_name
      });
    } else {
      const index = this.targeted_sellers.findIndex(x => x._id === seller._id);
      this.targeted_sellers.splice(index, 1);
    }
    this.quoteRequest.sellers = this.targeted_sellers;
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }

  pickEcosystem(ecosystem: Ecosystem): void {
    this.targeted_ecosystem = ecosystem;
    this.targeted_sellers = [];
    for (let i = 0; i < ecosystem.participants.length; i++) {
      this.targetSeller(ecosystem.participants[i], true, false);
    }
    this.displayEcosystemSellers();
  }

  isPicked(ecosystem: Ecosystem): Boolean {
    if (this.targeted_ecosystem) {
      return ecosystem._id === this.targeted_ecosystem._id;
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
    if (table === 'clients' && this.sellersSecOpened) {
      $('#ecosystem-sellers').hide();
      $('#suppliers-list').toggleClass('col-md-8 col-md-12');
      this.sellersSecOpened = false;
    }
    this.toggledTable = table;
  }

  draftQuoterequest() {
    this.validQuoteRequest.emit(true);
    this.quoteRequestService.draft(this.quoteRequest).subscribe(quoteRequest => {
      this.alerts.showAlert('Your quote request has been saved');
      this.router.navigateByUrl('/quote-request/list');
    });
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
}
