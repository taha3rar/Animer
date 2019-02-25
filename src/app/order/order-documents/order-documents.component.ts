import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-documents',
  templateUrl: './order-documents.component.html',
  styleUrls: ['./order-documents.component.scss']
})
export class OrderDocumentsComponent implements OnInit {
  @Input()
  documents: Document[];
  @Input()
  transaction_id: string;

  constructor() {}

  ngOnInit() {}
}
