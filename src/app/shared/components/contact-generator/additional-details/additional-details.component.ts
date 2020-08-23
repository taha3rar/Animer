import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss'],
})
export class AdditionalDetailsComponent implements OnInit {
  searchTerm: string;
  constructor() {}
  ngOnInit() {}
  member(type: 'yes' | 'no') {
    if (type === 'yes') {
      $('#no').removeClass('bttn-outline-primary');
      $('#no').addClass('bttn-outline');
    } else {
      $('#yes').removeClass('bttn-outline-primary');
      $('#yes').addClass('bttn-outline');
    }

    $(`#${type}`).addClass('bttn-outline-primary');
    $(`#${type}`).removeClass('bttn-outline');
  }
}
