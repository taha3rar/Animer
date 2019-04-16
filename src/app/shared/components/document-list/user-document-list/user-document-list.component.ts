import { AlertsService } from './../../../../core/alerts.service';
import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from '../../base-list/base-list.component';
import { UserDocumentService } from '@app/core/api/user-document.service';
import { Router } from '@angular/router';
import { UserDocument } from '@app/core/models/user/document';
declare const $: any;

@Component({
  selector: 'app-user-document-list',
  templateUrl: './user-document-list.component.html',
  styleUrls: ['./user-document-list.component.scss']
})
export class UserDocumentComponent extends BaseListComponent implements OnInit {
  @Input()
  documents: UserDocument[];
  @Input()
  client_id: string;
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

  constructor(
    private userDocumentService: UserDocumentService,
    protected router: Router,
    private alerts: AlertsService
  ) {
    super(userDocumentService, router, {
      deleteText: 'Once deleted, you will not be able to recover this document!'
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validateFile(file)) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const document = new UserDocument();
          document.file_name = file.name.replace(/\.[^/.]+$/, '');
          document.client_id = this.client_id;
          const base64File = (reader.result as string).split(',')[1];
          document.file = base64File;
          this.userDocumentService.create(document).subscribe(() => {
            this.alerts.showAlert('Your document has been uploaded');
            this.router.navigate([this.router.url]);
          });
        };
      } else {
        $.notify(
          {
            icon: 'notifications',
            message: 'Maximum file size is 3MB and it should be .jpg, .pdf or .png'
          },
          {
            type: 'danger',
            timer: 5000,
            placement: {
              from: 'top',
              align: 'right'
            },
            offset: 78
          }
        );
      }
    }
  }

  validateFile(file: any) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 3e6;
  }
}
