import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this document!',
      icon: 'warning'
    });
  }
}
