import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(): Promise<boolean> | Observable<boolean> | boolean {
    const isPermitted = this.authService.credentials.user.roles.includes('agribusiness');

    if (isPermitted) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
