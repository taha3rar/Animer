import { Component, OnInit, Input, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import * as Feather from 'feather-icons';
import { Contact } from '@avenews/agt-sdk';
@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() user: Contact;
  secondLetter: string;
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    Feather.replace();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      if (this.user.fullName) {
        this.secondLetter = this.user.fullName.slice(
          this.user.fullName.indexOf(' ') + 1,
          this.user.fullName.indexOf(' ') + 2
        );
      }
    }
  }
}
