import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup } from '@angular/forms';
import { OrderDataService } from '../order-data.service';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { Intercom } from 'ng-intercom';

@Component({
  selector: 'app-order-generator-suppliers',
  templateUrl: './order-generator-suppliers.component.html',
  styleUrls: ['./order-generator-suppliers.component.scss'],
  providers: [FilterPipe]
})
export class OrderGeneratorSuppliersComponent extends BaseNavigationComponent implements OnInit {
  form: FormGroup;
  clients: Client[];
  nextBtnClicked = false;
  page = 1;
  searchTerm: string;
  hasSeller = false;
  @Output() startTour = new EventEmitter<string>();
  @Input() tourName: string;

  constructor(private route: ActivatedRoute, private orderDataService: OrderDataService, public intercom: Intercom) {
    super();
  }

  ngOnInit() {
    this.clients = this.route.snapshot.data['sellers'];
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
    if (this.tourName === 'suppliers') {
      this.intercom.startTour(95289);
    }
  }

  profilePicture(client: Client) {
    return client.profile_picture || defaultValues.profile_picture;
  }

  get order() {
    return this.form.controls;
  }

  resetForm(client: Client) {
    this.hasSeller = true;
    this.form.patchValue({
      seller: client
    });
    this.orderDataService.setProductList([]);
    this.order['subtotal'].setValue(0);
    this.order['currency'].setValue(undefined);
    this.orderDataService.setForm(this.form);
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
  }

  validateSeller() {
    this.nextBtnClicked = true;
    if (this.hasSeller) {
      this.startTour.emit('products');
    }
  }

  selectCard(id: any) {
    $('input[id="' + id + '"]').trigger('click');
  }
}
