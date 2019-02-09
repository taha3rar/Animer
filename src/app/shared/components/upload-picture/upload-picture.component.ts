import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { acceptedMimeTypes } from '@app/shared/helpers/pictureMimeTypes';
import { UserService, AuthenticationService } from '@app/core';
import { User } from '@app/core/models/user/user';

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
  @ViewChild('picInput')
  picInput: ElementRef;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  previewPic() {
    let file;

    file = this.picInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64File;
        const picture = reader.result;
        base64File = picture.toString().split(',')[1];

        if (this.type === 'profile') {
          this.userService.saveProfileImage(base64File).subscribe(
            res => {
              // set image with the S3 url
              this.picture = res.url;
              this.user.personal_information.profile_picture = this.picture.toString();
              // update user object
              this.userService.update(this.user._id, this.user).subscribe(data => {
                const credentialsToUpdate = this.authenticationService.credentials;
                credentialsToUpdate.user.personal_information = data.personal_information;
                this.authenticationService.setCredentials(credentialsToUpdate);
              });
            },
            err => {
              // TODO
            }
          );
        }
      };
    } else {
      // TODO
    }
  }

  validateFile(file: any) {
    return acceptedMimeTypes.includes(file.type) && file.size < 5e6;
  }
}
