import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grn-document',
  templateUrl: './grn-document.component.html',
  styleUrls: ['./grn-document.component.scss']
})
export class GrnDocumentComponent implements OnInit {
  @Input() generateGrn = true;

  constructor() {}

  ngOnInit() {}
}
