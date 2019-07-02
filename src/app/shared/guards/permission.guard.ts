import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private permissionsService: NgxPermissionsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const permission = route.data.permission;
    const isPermitted = this.permissionsService.getPermission(permission);

    if (isPermitted) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
