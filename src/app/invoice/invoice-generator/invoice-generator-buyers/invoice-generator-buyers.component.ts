import { BaseNavigationComponent } from './../../../shared/components/base-navigation/base-navigation.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { User } from '@app/core/models/user/user';

@Component({
  selector: 'app-invoice-generator-buyers',
  templateUrl: './invoice-generator-buyers.component.html',
  styleUrls: ['./invoice-generator-buyers.component.scss']
})
export class InvoiceGeneratorBuyersComponent extends BaseNavigationComponent implements OnInit {
  currentUser: User;
  @Input()
  form: FormGroup;
  clients: Client[];
  nextBtnClicked = false;
  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {
    super();
  }
  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];
    this.route.data.subscribe(({ clients }) => {
      this.clients = clients.filter(function(client: Client) {
        return client.role.includes('buyer');
      });
    });
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }

  get validBuyer() {
    return this.form.controls.buyer.valid;
  }
}
