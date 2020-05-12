import { Component, OnInit, Input } from '@angular/core';
import { UserDocument } from '@app/core/models/user/document';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-contact-documents',
  templateUrl: './contact-documents.component.html',
  styleUrls: ['./contact-documents.component.scss']
})
export class ContactDocumentsComponent implements OnInit {
  @Input()
  documents: UserDocument[];
  @Input()
  contact_id: string;
  @Input()
  user: Contact;

  constructor() {}

  ngOnInit() {}
}
