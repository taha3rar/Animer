import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/_helpers/default_values';
import { Invoice } from '@app/core/models/order/invoice';

@Component({
  selector: 'app-invoice-generator-buyers',
  templateUrl: './invoice-generator-buyers.component.html',
  styleUrls: ['./invoice-generator-buyers.component.scss']
})
export class InvoiceGeneratorBuyersComponent implements OnInit {
  @Input()
  invoice: Invoice;
  clients: Client[];
  page = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ clients }) => {
      this.clients = clients;
    });
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }
}
