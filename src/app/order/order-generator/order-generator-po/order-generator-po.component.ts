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
  productsValid = true;
  @Output() newDraftPO = new EventEmitter();
  @Input() fromQuotation = false;
  inventoryProducts: ProductInvoice[];
  quotedProducts: ProductInvoice[] = [];

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
      this.currency = this.form.value.currency;
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.products = data;
      }
    });
    this.formInput = this.form;
    if (this.fromQuotation) {
      this.productService.getByUser(this.seller._id).subscribe(products => {
        this.inventoryProducts = <ProductInvoice[]>(<unknown>products);
      });
      this.quotationService.getAcceptedQuotations(this.seller._id, this.buyer._id).subscribe(quotations => {
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
    dialogConfig.height = '900px';
    dialogConfig.width = '980px';
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

  draftOrder() {
    let _date = this.form.value.sign_by.date;
    if (_date) {
      this.order['sign_by'].patchValue({ date: new Date(_date.year, _date.month - 1, _date.day) });
    }
    _date = this.form.value.deliver_to.expected_delivery_date;
    if (_date) {
      this.order['deliver_to'].patchValue({ expected_delivery_date: new Date(_date.year, _date.month - 1, _date.day) });
    }
    _date = this.form.value.date_created;
    _date
      ? this.form.patchValue({ date_created: new Date(_date.year, _date.month - 1, _date.day) })
      : this.form.patchValue({ date_created: Date.now() });
    this.newDraftPO.emit(true);
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.newOrder.draft = true;
    this.orderService.draft(this.newOrder).subscribe(() => {
      this.alerts.showAlert('Your purchase order has been saved as a draft!');
      this.router.navigateByUrl('/order/list');
    });
  }

  toReview() {
    let _date = this.form.value.sign_by.date;
    this.order['sign_by'].patchValue({ date: new Date(_date.year, _date.month - 1, _date.day) });
    _date = this.form.value.deliver_to.expected_delivery_date;
    if (_date) {
      this.order['deliver_to'].patchValue({ expected_delivery_date: new Date(_date.year, _date.month - 1, _date.day) });
    }
    _date = this.form.value.date_created;
    this.form.patchValue({ date_created: new Date(_date.year, _date.month - 1, _date.day) });
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.orderDataService.setNewOrder(this.newOrder);
  }
}
