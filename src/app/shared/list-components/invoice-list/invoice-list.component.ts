import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/order/invoice';
import swal from 'sweetalert';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input()
  invoices: Invoice[];
  page = 1;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(({ invoices }) => {
      this.invoices = invoices;
    });
  }

  ngOnInit() {}

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this invoice!',
      icon: 'warning'
    });
  }
}
