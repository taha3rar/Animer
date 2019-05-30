import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent implements OnInit {
  page = 1;

  constructor() {}

  ngOnInit() {}
}
