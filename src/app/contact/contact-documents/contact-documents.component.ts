import { Component, Input } from '@angular/core';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-contact-documents',
  templateUrl: './contact-documents.component.html'
})
export class ContactDocumentsComponent {
  @Input()
  contact: Contact;

  constructor() {}
}
