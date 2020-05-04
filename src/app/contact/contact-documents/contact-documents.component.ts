import { Component, OnInit, Input } from '@angular/core';
import { UserDocument } from '@app/core/models/user/document';
import { User } from '@app/core/models/user/user';

@Component({
  selector: 'app-contact-documents',
  templateUrl: './contact-documents.component.html',
  styleUrls: ['./contact-documents.component.scss']
})
export class ContactDocumentsComponent implements OnInit {
  @Input()
  documents: UserDocument[];
  @Input()
  client_id: string;
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}
}
