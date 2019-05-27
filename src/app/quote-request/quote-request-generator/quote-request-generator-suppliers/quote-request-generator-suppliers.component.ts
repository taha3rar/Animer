import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';
import { User } from '@app/core/models/user/user';
import { QuoteRequestDataService } from '../quote-request-data.service';

@Component({
  selector: 'app-quote-request-generator-suppliers',
  templateUrl: './quote-request-generator-suppliers.component.html',
  styleUrls: ['./quote-request-generator-suppliers.component.scss']
})
export class QuoteRequestGeneratorSuppliersComponent implements OnInit {
  toggledTable = 'clients';
  buyer_sellers: Client[];
  buyer_ecosystems: Ecosystem[];
  targeted_sellers: any[] = [];
  targeted_ecosystem = new Ecosystem();

  constructor(private route: ActivatedRoute, private quoteRequestDataService: QuoteRequestDataService) {}

  ngOnInit() {
    this.buyer_ecosystems = this.route.snapshot.data['ecosystems'];
    const buyer_clients = this.route.snapshot.data['clients'];
    this.buyer_sellers = buyer_clients.filter(function(buyer_client: Client) {
      return buyer_client.role !== 'buyer';
    });
  }

  targetSeller(seller: any, isChecked: Boolean, single: Boolean): void {
    if (this.targeted_ecosystem && single) {
      this.targeted_ecosystem = undefined;
    }
    if (isChecked) {
      this.targeted_sellers.push(seller);
    } else {
      const index = this.targeted_sellers.findIndex(x => x._id === seller._id);
      this.targeted_sellers.splice(index, 1);
    }
    this.quoteRequestDataService.setTargetedSellers(this.targeted_sellers);
  }

  pickEcosystem(ecosystem: Ecosystem): void {
    this.targeted_ecosystem = ecosystem;
    this.targeted_sellers = [];
    for (let i = 0; i < ecosystem.participants.length; i++) {
      this.targetSeller(ecosystem.participants[i], true, false);
    }
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
    this.toggledTable = table;
  }
}
