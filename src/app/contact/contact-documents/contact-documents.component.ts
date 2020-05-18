import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Contact, UploadFileDTO } from '@avenews/agt-sdk';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { AlertsService } from '@app/core/alerts.service';
import { SdkService } from '@app/core/sdk.service';
declare const $: any;

@Component({
  selector: 'app-contact-documents',
  templateUrl: './contact-documents.component.html'
})
export class ContactDocumentsComponent extends BaseListComponent implements OnInit {
  @Input()
  contact: Contact;
  page = 1;
  uploadingFileName: string;
  dynamic = 0;

  acceptedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'image/png'
  ];

  constructor(private sdkService: SdkService, protected router: Router, private alerts: AlertsService) {
    super(undefined, router, {
      deleteText: 'Once deleted, you will not be able to recover this document!'
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validateFile(file)) {
        $('.push-modal').css('display', 'block');
        reader.readAsDataURL(file);
        reader.onload = () => {
          const fileName = file.name.replace(/\.[^/.]+$/, '');
          this.uploadingFileName = fileName;
          const base64File = (reader.result as string).split(',')[1];
          const document: UploadFileDTO = {
            file: base64File,
            fileName,
            mime: file.type
          };
          this.sdkService.uploadContactDocument(document, this.contact._id).then(() => {
            $('.push-modal').css('display', 'none');
            this.alerts.showAlert('Your document has been uploaded');
            this.router.navigate([this.router.url]);
            this.dynamic = 0;
          });
        };
        reader.onprogress = (data: any) => {
          this.dynamic = (data.loaded / data.total) * 100;
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
