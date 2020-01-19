import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup } from '@angular/forms';
import { OrderDataService } from '../order-data.service';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { Intercom } from 'ng-intercom';
import { environment } from '@env/environment';

@Component({
  selector: 'app-order-generator-suppliers',
  templateUrl: './order-generator-suppliers.component.html',
  styleUrls: ['./order-generator-suppliers.component.scss'],
  providers: [FilterPipe]
})
export class OrderGeneratorSuppliersComponent extends BaseNavigationComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  clients: Client[];
  nextBtnClicked = false;
  page = 1;
  searchTerm: string;
  tours = environment.intercom.tours;
  hasSeller = false;

  constructor(private route: ActivatedRoute, private orderDataService: OrderDataService, public intercom: Intercom) {
    super();
  }

  ngOnInit() {
    this.clients = this.route.snapshot.data['sellers'];
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
  }

  ngAfterViewInit() {
    this.orderDataService.currentTourStep.subscribe(step => {
      if (step === 'suppliers') {
        this.intercom.startTour(this.tours.orders.generator.suppliersTour);
      }
    });
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
    this.orderDataService.setTourStep('products');
  }

  selectCard(id: any) {
    $('input[id="' + id + '"]').trigger('click');
  }
}
