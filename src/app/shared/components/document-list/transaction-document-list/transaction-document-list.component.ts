import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from '../../base-list/base-list.component';
import { DocumentService } from '@app/core/api/document.service';
import { Router } from '@angular/router';
import { Document } from '@app/core/models/order/document';

@Component({
  selector: 'app-transaction-document-list',
  templateUrl: './transaction-document-list.component.html',
  styleUrls: ['./transaction-document-list.component.scss']
})
export class TransactionDocumentListComponent extends BaseListComponent implements OnInit {
  @Input()
  documents: Document[];
  @Input()
  transaction_id: string;
  page = 1;

  acceptedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'image/png'
  ];

  constructor(private documentService: DocumentService, protected router: Router) {
    super(documentService, router, {
      deleteText: 'Once deleted, you will not be able to recover this document!'
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const document = new Document();
        document.file_name = file.name.replace(/\.[^/.]+$/, '');
        document.transaction_id = this.transaction_id;
        const base64File = (reader.result as string).split(',')[1];
        document.file = base64File;
        this.documentService.create(document).subscribe(() => this.router.navigate([this.router.url]));
      };
    }
  }

  validateFile(file: any) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 5e6;
  }
}