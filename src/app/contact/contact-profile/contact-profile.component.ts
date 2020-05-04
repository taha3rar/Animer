import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core/models/user/user';
import { Counter } from '../contact/contact.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  @Input()
  user: User;
  @Input()
  counter: Counter;
  @Input()
  tabs: any;
  constructor() {}

  ngOnInit() {}

  activateTab(tabRef: string) {
    $(this.tabs)
      .find('.active')
      .removeClass('active');
    $(this.tabs)
      .find('a[href="#' + tabRef + '"]')
      .parent()
      .addClass('active');
  }
}
