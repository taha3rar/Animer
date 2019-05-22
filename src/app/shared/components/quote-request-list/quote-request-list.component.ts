import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-quote-request-list',
  templateUrl: './quote-request-list.component.html',
  styleUrls: ['./quote-request-list.component.scss']
})
export class QuoteRequestListComponent implements OnInit {
  isBuyer: Boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
  }
}
