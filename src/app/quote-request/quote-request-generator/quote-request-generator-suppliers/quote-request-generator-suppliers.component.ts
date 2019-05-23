import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-request-generator-suppliers',
  templateUrl: './quote-request-generator-suppliers.component.html',
  styleUrls: ['./quote-request-generator-suppliers.component.scss']
})
export class QuoteRequestGeneratorSuppliersComponent implements OnInit {
  toggledTable = 'clients';
  constructor() {}

  ngOnInit() {}

  toggleTable(table: string) {
    this.toggledTable = table;
  }
}
