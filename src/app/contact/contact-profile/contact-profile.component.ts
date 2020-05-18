import { Component, OnInit, Input, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import * as Feather from 'feather-icons';
import { Contact } from '@avenews/agt-sdk';
@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() contact: Contact;
  secondLetter: string;
  tempContact: Contact;
  edit = false;
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    Feather.replace();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact']) {
      if (this.contact.fullName) {
        this.secondLetter = this.contact.fullName.slice(
          this.contact.fullName.indexOf(' ') + 1,
          this.contact.fullName.indexOf(' ') + 2
        );
        this.tempContact = this.contact;
      }
    }
  }
  editContact() {
    this.edit = true;
    this.tempContact = this.contact;
  }
}
