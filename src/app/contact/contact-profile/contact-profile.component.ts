import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { User } from '@avenews/agt-sdk';
@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit, AfterViewInit {
  @Input() user: User;

  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    Feather.replace();
  }
}
