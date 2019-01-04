import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/invoice/invoice';

@Component({
  selector: 'app-client-invoices',
  templateUrl: './client-invoices.component.html',
  styleUrls: ['./client-invoices.component.scss']
})
export class ClientInvoicesComponent implements OnInit {
  invoices: Invoice[];
  page = 1;
  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
    this.route.data.subscribe(({ invoices }) => {
      this.invoices = invoices;
    });
  }

  get userId() {
    return this.authService.currentUserId;
  }

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this invoice!',
      icon: 'warning'
    });
  }
}
