import { AlertsService } from './../../../core/alerts.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import { DocumentGeneratorComponent } from '@app/shared/components/document-generator/document-generator.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductService, QuotationService } from '@app/core';
import { ModalInventoryComponent } from '@app/shared/components/products/modal-inventory/modal-inventory.component';
import { Quotation } from '@app/core/models/quotation/quotation';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '@app/core/models/order/product';
import { FormGroup } from '@angular/forms';
import { User } from '@app/core/models/order/user';

@Component({
  selector: 'app-order-generator-po',
  templateUrl: './order-generator-po.component.html',
  styleUrls: ['./order-generator-po.component.scss']
})
export class OrderGeneratorPoComponent extends DocumentGeneratorComponent implements OnInit {
  newOrder: Order;
  selectedProducts: any[];
  currency: string;
  products: ProductInvoice[] = [];
  productsPristine = true;
  @Output() newDraftPO = new EventEmitter();
  @Input() fromQuotation = false;
  @Input() openOrder = false;
  inventoryProducts: any[];
  quotedProducts: ProductInvoice[] = [];
  validBy: NgbDateStruct;
  issuedOn: NgbDateStruct;
  deliveryOn: NgbDateStruct;
  agriculturalProducts: Product[];
  processedProducts: Product[];
  addedProducts: ProductInvoice[] = [];
  noInventory: boolean;

  constructor(
    public orderDataService: OrderDataService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
    private alerts: AlertsService,
    private productService: ProductService,
    private quotationService: QuotationService
  ) {
    super(dialog, orderDataService);
  }

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      if (this.seller._id) {
        this.productService.getByUser(this.seller._id).subscribe(products => {
          this.inventoryProducts = <ProductInvoice[]>(<unknown>products);
        });
      }
      this.currency = this.form.value.currency;
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.products = data;
      }
    });

    this.formInput = this.form;
    this.validBy = this.formInput.value.sign_by.date;
    this.issuedOn = this.formInput.value.date_created;
    this.deliveryOn = this.formInput.value.deliver_to.expected_delivery_date;

    if (this.fromQuotation) {
      this.quotationService.getAcceptedPerParticipants(this.seller._id, this.buyer._id).subscribe(quotations => {
        quotations.forEach((quotation: Quotation) => {
          let quotedProduct: ProductInvoice;
          quotedProduct = <ProductInvoice>(<unknown>quotation.product);
          quotedProduct.quantity = quotation.product.quantity_offered;
          quotedProduct.total_weight = quotation.product.total_weight_offered || undefined;
          quotedProduct.package_price = Number(
            (quotation.product.product_subtotal / quotation.product.quantity_offered).toFixed(2)
          );
          quotedProduct.currency = quotation.currency;
          quotedProduct.quotation_id = quotation._id;
          this.quotedProducts.push(quotedProduct);
        });
      });
    }
  }

  get order() {
    return this.form.controls;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  get seller() {
    return this.form.controls.seller.value;
  }

  get date_created() {
    return this.form.controls.date_created.value;
  }

  openDialogInventory(quoted: boolean): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '92vh';
    dialogConfig.width = '1200px';
    dialogConfig.data = {
      inventoryProducts: quoted ? this.quotedProducts : this.inventoryProducts,
      currency: this.form.value.currency,
      fromQuotation: quoted ? true : false,
      chosenProducts: this.products
    };

    const dialogRef = this.dialog.open(ModalInventoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newProducts => {
      if (newProducts) {
        newProducts.forEach((newProduct: any) => {
          if (!this.form.value.currency) {
            this.form.controls['currency'].setValue(newProduct.currency);
          }
          for (let i = 0; i < this.products.length; i++) {
            if (
              JSON.stringify(this.products[i]) === JSON.stringify(newProduct) ||
              this.products[i]._id === newProduct._id
            ) {
              super.deleteProduct(i);
              if (!this.form.value.currency) {
                this.form.controls['currency'].setValue(newProduct.currency);
              }
            }
          }
          super.updateTotalDue(newProduct.product_subtotal);
        });
        this.products = this.products.concat(newProducts);
      }
    });
  }

  dateUpdate(dateName: string, dateUpdated: NgbDateStruct, dateForm?: string) {
    if (dateUpdated) {
      dateForm
        ? this.order[dateForm].patchValue({
            [dateName]: new Date(dateUpdated.year, dateUpdated.month - 1, dateUpdated.day).toJSON()
          })
        : this.form.patchValue({
            [dateName]: new Date(dateUpdated.year, dateUpdated.month - 1, dateUpdated.day).toJSON()
          });
    } else {
      dateForm ? this.order[dateForm].patchValue({ [dateName]: null }) : this.form.patchValue({ [dateName]: null });
    }
  }

  preSubmit() {
    if (this.validBy) {
      this.order['sign_by'].patchValue({
        date: new Date(this.validBy.year, this.validBy.month - 1, this.validBy.day).toJSON()
      });
    } else {
      this.order['sign_by'].patchValue({ date: null });
    }
    if (this.deliveryOn) {
      this.order['deliver_to'].patchValue({
        expected_delivery_date: new Date(this.deliveryOn.year, this.deliveryOn.month - 1, this.deliveryOn.day).toJSON()
      });
    } else {
      this.order['deliver_to'].patchValue({ expected_delivery_date: null });
    }
    this.issuedOn
      ? this.form.patchValue({
          date_created: new Date(this.issuedOn.year, this.issuedOn.month - 1, this.issuedOn.day).toJSON()
        })
      : this.form.patchValue({ date_created: new Date().toJSON() });
  }

  updateSeller(newUser: User) {
    this.form.controls['seller'].patchValue({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      company_name: newUser.company_name,
      company_number: newUser.company_number,
      address: newUser.address,
      city: newUser.city,
      country: newUser.country,
      zipcode: newUser.zipcode,
      phone_number: newUser.phone_number
    });
    console.log(this.seller);
  }

  draftOrder() {
    this.disableSubmitButton(true);
    this.preSubmit();
    this.newDraftPO.emit(true);
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.newOrder.draft = true;
    this.orderService.draft(this.newOrder).subscribe(
      () => {
        this.alerts.showAlert('Your purchase order has been saved as a draft!');
        this.router.navigateByUrl('/order');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }

  toReview() {
    this.preSubmit();
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.orderDataService.setNewOrder(this.newOrder);
  }
}
