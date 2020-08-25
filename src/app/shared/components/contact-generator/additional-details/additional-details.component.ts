import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss'],
})
export class AdditionalDetailsComponent implements OnInit {
  searchTerm: string;
  isMember: boolean;
  constructor() {}
  ngOnInit() {}
  member(type: 'yes' | 'no') {
    type === 'yes' ? (this.isMember = true) : (this.isMember = false);
  }
}
