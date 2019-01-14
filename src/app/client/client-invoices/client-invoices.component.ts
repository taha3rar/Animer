import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/invoice/invoice';

@Component({
  selector: 'app-client-invoices',
  templateUrl: './client-invoices.component.html',
  styleUrls: ['./client-invoices.component.scss']
})
export class ClientInvoicesComponent implements OnInit {
  @Input()
  invoices: Invoice[];
  page = 1;
  constructor() {}

  ngOnInit() {}
}
