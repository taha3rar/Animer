import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-quote-requests-list',
  templateUrl: './quote-requests-list.component.html',
  styleUrls: ['./quote-requests-list.component.scss']
})
export class QuoteRequestsListComponent implements OnInit {
  isBuyer: Boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
  }
}
