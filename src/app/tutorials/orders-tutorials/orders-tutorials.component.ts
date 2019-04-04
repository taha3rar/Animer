import { Component, OnInit, Input } from '@angular/core';
import { TutorialControlComponent } from '@app/shared/components/tutorial-control/tutorial-control.component';
import { AuthenticationService } from '@app/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-orders-tutorials',
  templateUrl: './orders-tutorials.component.html'
})
export class OrdersTutorialsComponent extends TutorialControlComponent implements OnInit {
  agribusinessUser: boolean;
  numberOfSlides = 4;
  permissions = this.permissionsService.getPermissions();
  userPerms: any;

  constructor(private authService: AuthenticationService, private permissionsService: NgxPermissionsService) {
    super();
  }

  ngOnInit() {
    this.permissionsService.permissions$.subscribe(permissions => {
      this.userPerms = permissions;
    });
    this.agribusinessUser = this.authService.isAgribusiness;
  }
}
