import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';

@Component({
  selector: 'app-quote-request-generator-suppliers',
  templateUrl: './quote-request-generator-suppliers.component.html',
  styleUrls: ['./quote-request-generator-suppliers.component.scss']
})
export class QuoteRequestGeneratorSuppliersComponent implements OnInit {
  toggledTable = 'clients';
  buyer_sellers: Client[];
  buyer_ecosystems: Ecosystem[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.buyer_ecosystems = this.route.snapshot.data['ecosystems'];
    const buyer_clients = this.route.snapshot.data['clients'];
    this.buyer_sellers = buyer_clients.filter(function(buyer_client: Client) {
      return buyer_client.role !== 'buyer';
    });
  }

  toggleTable(table: string) {
    this.toggledTable = table;
  }
}
