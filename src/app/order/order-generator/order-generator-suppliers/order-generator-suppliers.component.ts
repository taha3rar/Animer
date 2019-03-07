import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup } from '@angular/forms';
import { OrderDataService } from '../order-data.service';

@Component({
  selector: 'app-order-generator-suppliers',
  templateUrl: './order-generator-suppliers.component.html',
  styleUrls: ['./order-generator-suppliers.component.scss']
})
export class OrderGeneratorSuppliersComponent extends BaseNavigationComponent implements OnInit {
  form: FormGroup;
  clients: Client[];
  nextBtnClicked = false;
  page = 1;

  constructor(private route: ActivatedRoute, private orderDataService: OrderDataService) {
    super();
  }

  ngOnInit() {
    this.clients = this.route.snapshot.data['sellers'];
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
    console.log(this.form);
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }

  get validSeller() {
    if (this.form.value.seller.controls) {
      return this.form.value.seller.controls.valid;
    } else {
      return true;
    }
  }

  validateSeller() {
    this.orderDataService.setForm(this.form);
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
    this.nextBtnClicked = true;
  }
}
