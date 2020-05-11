import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { acceptedMimeTypes } from '@app/shared/helpers/pictureMimeTypes';
import { UserService, AuthenticationService } from '@app/core';
import { User } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  picture: string | ArrayBuffer;
  @Input()
  user: User;
  @Output()
  imageEvent = new EventEmitter<any>();
  @ViewChild('picInput')
  picInput: ElementRef;
  hideBar = false;
  loaderVisible = false;
  dynamic = 0;
  constructor(private authenticationService: AuthenticationService, private sdkService: SdkService) {}

  ngOnInit() {}

  previewPic() {
    let file: any;

    file = this.picInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64File;
        const picture = reader.result;
        base64File = picture.toString().split(',')[1];
        this.loaderVisible = true;
        if (this.type === 'profile') {
          this.sdkService.uploadProfilePicture(base64File).then((user: User) => {
            const credentialsToUpdate = this.authenticationService.credentials;
            credentialsToUpdate.user.personalInformation.profilePicture = user.personalInformation.profilePicture;
            this.authenticationService.setCredentials(credentialsToUpdate);
            this.imageEvent.emit(false);
            this.loaderVisible = false;
          });
        }
      };
    }
  }

  validateFile(file: any) {
    return acceptedMimeTypes.includes(file.type) && file.size < 5e6;
  }
}
