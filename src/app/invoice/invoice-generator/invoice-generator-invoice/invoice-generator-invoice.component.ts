import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Product } from '@app/core/models/product';
import { InvoiceInventoryComponent } from './invoice-inventory/invoice-inventory.component';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
  productList: any[];
  @Input()
  form: FormGroup;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log('init');
    this.productList = [];
  }

  get invoice() {
    return this.form.controls;
  }

  get issuer() {
    return this.form.controls.seller.value;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  get date_created() {
    return this.form.controls.date_created.value;
  }

  openDialogInventory(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '580px';
    dialogConfig.width = '800px';

    this.dialog.open(InvoiceInventoryComponent, dialogConfig);
  }

  save() {
    console.log(this.form);
  }

  display() {
    console.log(this.productList);
  }
}
