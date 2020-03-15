import { AuthenticationService } from './../../../../core/authentication/authentication.service';
import { DpoInformation } from './../../../../core/models/user/dpo-info';
import { AlertsService } from '@app/core/alerts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DpoDocuments } from '@app/core/models/user/dpo-documents';
import { UserService } from '@app/core';
declare const $: any;
@Component({
  selector: 'app-dpo-documents',
  templateUrl: './dpo-documents.component.html',
  styleUrls: ['./dpo-documents.component.scss']
})
export class DpoDocumentsComponent implements OnInit {
  max = 100;
  uploadingFileName: String;
  dynamic = 0;
  userId: string;
  @Input() documentIDvalid: boolean;
  @Input() documentCertificatevalid: boolean;
  documentInfo = {};
  url: string;
  id_file_name: string;
  certificate_file_name: string;
  terms_file_name: string;
  @Output() documentInfoEmitter = new EventEmitter();
  acceptedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'image/png'
  ];

  constructor(private alerts: AlertsService, private userService: UserService, private auth: AuthenticationService) {}

  ngOnInit() {
    this.userId = this.auth.currentUserId;
  }

  onFileChange(event: any, file_type: String) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validateFile(file)) {
        $('.push-modal').css('display', 'block');
        reader.readAsDataURL(file);
        reader.onload = () => {
          const document = new DpoDocuments();
          document.file_name = file.name.replace(/\.[^/.]+$/, '');
          this.uploadingFileName = document.file_name;
          const base64File = (reader.result as string).split(',')[1];
          document.bytes = base64File;
          document.file_type = file_type;
          this.userService.saveDPODocuments(document, this.userId).subscribe(res => {
            const url = res.url;
            const file_name = res.file_name;
            this.documentInfo = { url, file_name, file_type };
            this.documentInfoEmitter.emit(this.documentInfo);
            this.alerts.showAlert('Your document has been uploaded');
            $('.push-modal').css('display', 'none');
            this.dynamic = 0;
            if (file_type === 'ID') {
              this.id_file_name = file_name;
            } else if (file_type === 'certificate_of_inco') {
              this.certificate_file_name = file_name;
            } else {
              this.terms_file_name = file_name;
            }
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
