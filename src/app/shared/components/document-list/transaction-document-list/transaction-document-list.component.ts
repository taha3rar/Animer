import { Component, OnInit, Input } from '@angular/core';
import { SdkService } from '@app/core/sdk.service';
import { Router } from '@angular/router';
import { AlertsService } from '@app/core/alerts.service';
import { BaseListComponent } from '../../base-list/base-list.component';
import { UploadFileDTO, NecessaryDocument, GoodsReceivedNote, Contact } from '@avenews/agt-sdk';

declare const $: any;

@Component({
  selector: 'app-transaction-document-list',
  templateUrl: './transaction-document-list.component.html',
  styleUrls: ['./transaction-document-list.component.scss']
})
export class TransactionDocumentListComponent extends BaseListComponent implements OnInit {
  @Input()
  type: 'contact' | 'grn';
  @Input()
  container: GoodsReceivedNote | Contact;
  page = 1;
  max = 100;
  uploadingFileName: string;
  dynamic = 0;
  acceptedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'application/msword',
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
          if (this.type === 'grn') {
            this.sdkService.uploadGrnDocument(document, this.container._id).then(this.successfullyHandler.bind(this));
          } else if (this.type === 'contact') {
            this.sdkService
              .uploadContactDocument(document, this.container._id)
              .then(this.successfullyHandler.bind(this));
          }
        };
        reader.onprogress = (data: any) => {
          this.dynamic = (data.loaded / data.total) * 100;
        };
      } else {
        $.notify(
          {
            icon: 'notifications',
            message: 'Maximum file size is 3MB and it should be .jpg, .pdf, .gif or .png'
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

  successfullyHandler() {
    this.alerts.showAlert('Your document has been uploaded');
    $('.push-modal').css('display', 'none');
    this.router.navigateByUrl(this.router.url);
    this.dynamic = 0;
  }

  successfullyDeleteHandler() {
    this.alerts.showAlert('Your document has been deleted');
    $('.push-modal').css('display', 'none');
    this.router.navigateByUrl(this.router.url);
    this.dynamic = 0;
  }

  validateFile(file: any) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 3e6;
  }

  delete(id: string) {
    if (this.type === 'contact') {
      return this.sdkService
        .deleteContactDocument(this.container._id, id)
        .then(this.successfullyDeleteHandler.bind(this));
    } else if (this.type === 'grn') {
      return this.sdkService.deleteGrnDocument(this.container._id, id).then(this.successfullyDeleteHandler.bind(this));
    }
  }
}
