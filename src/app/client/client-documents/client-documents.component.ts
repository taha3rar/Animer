import { Component, OnInit, Input } from '@angular/core';
import { UserDocument } from '@app/core/models/user/document';
import { User } from '@app/core/models/user/user';

@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss']
})
export class ClientDocumentsComponent implements OnInit {
  @Input()
  documents: UserDocument[];
  @Input()
  client_id: string;
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}
}
