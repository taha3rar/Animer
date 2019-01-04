import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { User } from '../../core/models/user/user';

declare const $: any;

@Component({
  selector: 'app-client-generator',
  templateUrl: './client-generator.component.html',
  styleUrls: ['./client-generator.component.scss']
})
export class ClientGeneratorComponent implements OnInit {
  private invitedClient: User;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.invitedClient = new User();
    this.invitedClient.roles = ['seller'];
    console.log(this.authenticationService.credentials);
  }

  targetStep(step: string) {
    const tab = $('a[href="#' + step + '"]');
    $(tab).click();
  }
}
