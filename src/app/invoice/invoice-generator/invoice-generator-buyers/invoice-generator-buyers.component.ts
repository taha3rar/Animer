import { BaseNavigationComponent } from './../../../shared/components/base-navigation/base-navigation.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { Invoice } from '@app/core/models/invoice/invoice';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-generator-buyers',
  templateUrl: './invoice-generator-buyers.component.html',
  styleUrls: ['./invoice-generator-buyers.component.scss']
})
export class InvoiceGeneratorBuyersComponent extends BaseNavigationComponent implements OnInit {
  @Input()
  form: FormGroup;
  clients: Client[];
  nextBtnClicked = false;
  constructor(private route: ActivatedRoute) {
    super();
  }
  ngOnInit() {
    this.route.data.subscribe(({ buyers }) => {
      this.clients = buyers;
    });
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }

  get validBuyer() {
    return this.form.controls.buyer.valid;
  }

  selectCard(id: any) {
    $('input[id="' + id + '"]').trigger('click');
  }
}
