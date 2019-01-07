import { Injectable } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Resolve } from '@angular/router';

@Injectable()
export class CurrentUserResolver implements Resolve<any> {
  constructor(private userService: UserService, private authenticationService: AuthenticationService) {}

  resolve() {
    return this.userService.get(this.authenticationService.currentUserId);
  }
}
