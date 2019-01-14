import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from '../base-list/base-list.component';
import { UserDocumentService } from '@app/core/api/user-document.service';
import { Router } from '@angular/router';
import { UserDocument } from '@app/core/models/user/document';

@Component({
  selector: 'app-user-document-list',
  templateUrl: './user-document-list.component.html',
  styleUrls: ['./user-document-list.component.scss']
})
export class UserDocumentComponent extends BaseListComponent implements OnInit {
  @Input()
  documents: UserDocument[];
  page = 1;

  constructor(private userDocumentService: UserDocumentService, protected router: Router) {
    super(userDocumentService, router, {
      deleteText: 'Once deleted, you will not be able to recover this document!'
    });
  }

  ngOnInit() {}
}
