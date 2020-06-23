import { Component, OnInit } from '@angular/core';
import { DPOTransaction } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topup-view',
  templateUrl: './topup-view.component.html',
  styleUrls: ['./topup-view.component.scss']
})
export class TopupViewComponent implements OnInit {
  transaction: DPOTransaction;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transaction = data.transaction;
    });
  }
}
