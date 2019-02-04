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
export class OrderGeneratorSuppliersComponent implements OnInit {
  form: FormGroup;
  clients: Client[];
  page = 1;

  constructor(private route: ActivatedRoute, private orderDataService: OrderDataService) {}

  ngOnInit() {
    this.clients = this.route.snapshot.data['sellers'];
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }

  get validSeller() {
    return this.form.controls.seller.valid;
  }

  validateSeller() {
    this.orderDataService.setForm(this.form);
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
  }

  onNextPage(clientsnumber: number) {
    const numberOfPages = Math.ceil(clientsnumber / 6);
    if (this.page < numberOfPages) {
      this.page++;
    }
  }

  onBackPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
