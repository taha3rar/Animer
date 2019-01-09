import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import swal from 'sweetalert';
import { AuthenticationService, InvoiceService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input()
  invoices: Invoice[];
  page = 1;

  constructor(
    private authService: AuthenticationService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  delete(id: string) {
    this.invoiceService.delete(id).subscribe(
      () => {
        this.router.navigate([this.router.url]);
      },
      err => {
        console.log(err);
      }
    );
  }

  warning(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this invoice!',
      icon: 'warning'
    }).then(() => {
      this.delete(id);
    });
  }

  get userId() {
    return this.authService.currentUserId;
  }
}
