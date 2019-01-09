import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Router } from '@angular/router';
import { BaseListComponent } from '../base-list/base-list.component';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends BaseListComponent implements OnInit {
  @Input()
  invoices: Invoice[];
  page = 1;

  constructor(
    private authService: AuthenticationService,
    protected invoiceService: InvoiceService,
    protected router: Router
  ) {
    super(invoiceService, router, {
      deleteText: 'Once deleted, you will not be able to recover this invoice!'
    });
  }

  ngOnInit() {}

  get userId() {
    return this.authService.currentUserId;
  }
}
