import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/order/invoice';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {
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
}
