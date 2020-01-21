import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { OrderDataService } from '../order-data.service';
import { DocumentGeneratorComponent } from '@app/shared/components/document-generator/document-generator.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductService, QuotationService, OrderService } from '@app/core';
import { ModalInventoryComponent } from '@app/shared/components/products/modal-inventory/modal-inventory.component';
import { Quotation } from '@app/core/models/quotation/quotation';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '@app/core/models/order/product';
import { UserDataComponent } from '@app/shared/components/user-data/user-data.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@app/core/alerts.service';
import { Intercom } from 'ng-intercom';
import { environment } from '@env/environment';

@Component({
  selector: 'app-order-generator-po',
  templateUrl: './order-generator-po.component.html',
  styleUrls: ['./order-generator-po.component.scss']
})
export class OrderGeneratorPoComponent extends DocumentGeneratorComponent implements OnInit, AfterViewInit {
  newOrder: Order;
  selectedProducts: any[];
  currency: string;
  products: ProductInvoice[] = [];
  productsPristine = true;
  @Output() newDraftPO = new EventEmitter();
  @Input() fromQuotation = false;
  @Input() openOrder = false;
  @ViewChild('sellerData') sellerData: UserDataComponent;
  newSeller: FormGroup;
  inventoryProducts: any[];
  quotedProducts: ProductInvoice[] = [];
  validBy: NgbDateStruct;
  issuedOn: NgbDateStruct;
  deliveryOn: NgbDateStruct;
  agriculturalProducts: Product[];
  processedProducts: Product[];
  addedProducts: ProductInvoice[] = [];
  noInventory: boolean;
  @Input() tourEnabled: boolean;
  tours = environment.intercom.tours;

  constructor(
    public orderDataService: OrderDataService,
    public dialog: MatDialog,
    private productService: ProductService,
    private orderService: OrderService,
    private quotationService: QuotationService,
    private router: Router,
    private alerts: AlertsService,
    public intercom: Intercom
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
          quotedProduct.total_amount_items = quotation.product.total_items_offered;
          quotedProduct.package_price = Number(
            (quotation.product.product_subtotal / quotation.product.quantity_offered).toFixed(2)
          );
          quotedProduct.currency = quotation.currency;
          quotedProduct.quotation_id = quotation._id;
          this.quotedProducts.push(quotedProduct);
        });
      });
    }
    this.onChanges();
  }

  ngAfterViewInit() {
    this.orderDataService.currentTourStep.subscribe(step => {
      console.log('po tour : ', this.tourEnabled);
      if (step === 'order' && this.tourEnabled) {
        this.intercom.startTour(this.tours.orders.generator.orderTour);
      }
    });
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

  onChanges(): void {
    this.preSubmit();
    this.form.valueChanges.subscribe(val => {
      this.updateOrder();
    });
  }

  openDialogInventory(quoted: boolean): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '84vh';
    dialogConfig.width = '1400px';
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

  draftOrder() {
    this.disableSubmitButton(true);
    this.newDraftPO.emit(true);
    this.preSubmit();
    if (this.openOrder) {
      this.orderService.draftOpen(this.newOrder).subscribe(
        () => {
          this.alerts.showAlert('Your purchase order has been saved as a draft!');
          this.router.navigateByUrl('/order');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    } else {
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
  }

  updateOrder() {
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.orderDataService.setNewOrder(this.newOrder);
    this.orderDataService.setTourStep('review');
  }
}
