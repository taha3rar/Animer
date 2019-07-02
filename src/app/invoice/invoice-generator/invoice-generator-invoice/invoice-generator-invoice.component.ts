import { AlertsService } from './../../../core/alerts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '@app/core/api/invoice.service';
import { ModalInventoryComponent } from '@app/shared/components/products/modal-inventory/modal-inventory.component';
import { DocumentGeneratorComponent } from '@app/shared/components/document-generator/document-generator.component';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent extends DocumentGeneratorComponent implements OnInit {
  products: ProductInvoice[] = [];
  newInvoice: Invoice;
  @Output()
  newInvoiceEvent = new EventEmitter<Invoice>();
  @Input()
  form: FormGroup;
  @Input()
  draft: boolean;
  @Input()
  invoiceProducts: ProductInvoice[];
  productsValid = true;
  @Output() savedAsDraft = new EventEmitter();

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService
  ) {
    super(dialog);
  }

  ngOnInit() {
    if (this.draft) {
      this.products = this.invoiceProducts;
    }
    this.onChanges();
    this.formInput = this.form;
  }

  onChanges(): void {
    this.form.get('vat_percentage').valueChanges.subscribe(val => {
      this.applyVat();
    });
    this.form.get('discount_percentage').valueChanges.subscribe(val => {
      this.applyDiscount();
    });
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

  updateTotalDue(newSubtotal: number): void {
    this.invoice['subtotal'].setValue(this.invoice.subtotal.value + newSubtotal);
    this.applyVat();
  }

  applyVat(): void {
    this.invoice['vat_amount'].setValue((this.invoice.vat_percentage.value / 100) * this.invoice.subtotal.value);
    this.applyDiscount();
  }

  applyDiscount(): void {
    this.invoice['discount_amount'].setValue(
      (this.invoice.discount_percentage.value / 100) * (this.invoice.vat_amount.value + this.invoice.subtotal.value)
    );
    this.invoice['total_due'].setValue(
      this.invoice.subtotal.value + this.invoice.vat_amount.value - this.invoice.discount_amount.value
    );
  }

  openDialogInventory(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '900px';
    dialogConfig.width = '980px';
    dialogConfig.data = {
      inventoryProducts: this.route.snapshot.data['products'],
      currency: this.invoice.currency.value,
      chosenProducts: this.products
    };

    const dialogRef = this.dialog.open(ModalInventoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newProducts => {
      if (newProducts) {
        newProducts.forEach((newProduct: any) => {
          if (!this.invoice.currency.value) {
            this.invoice['currency'].setValue(newProduct.currency);
          }
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i]._id === newProduct._id) {
              super.deleteProduct(i);
              if (!this.form.value.currency) {
                this.form.controls['currency'].setValue(newProduct.currency);
              }
            }
          }
          this.updateTotalDue(newProduct.product_subtotal);
        });
        this.products = this.products.concat(newProducts);
      }
    });
  }

  draftInvoice() {
    let _date = this.form.value.sign_by.date;
    if (_date) {
      this.invoice['sign_by'].patchValue({ date: new Date(_date.year, _date.month - 1, _date.day) });
    }
    _date = this.form.value.deliver_to.expected_delivery_date;
    if (_date) {
      this.invoice['deliver_to'].patchValue({
        expected_delivery_date: new Date(_date.year, _date.month - 1, _date.day)
      });
    }
    _date = this.form.value.date_created;
    _date
      ? this.form.patchValue({ date_created: new Date(_date.year, _date.month - 1, _date.day) })
      : this.form.patchValue({ date_created: Date.now() });
    this.savedAsDraft.emit(true);
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoice.draft = true;
    if (!this.draft) {
      this.invoiceService.draft(this.newInvoice).subscribe(() => {
        this.alerts.showAlert('Your proforma invoice has been saved as a draft!');
        this.router.navigateByUrl('/invoice/list');
      });
    } else {
      this.invoiceService.update(this.newInvoice._id, this.newInvoice).subscribe(() => {
        this.alerts.showAlert('Your proforma invoice has been saved as a draft!');
        this.router.navigateByUrl('/invoice/list');
      });
    }
  }

  toReview() {
    let _date = this.form.value.sign_by.date;
    this.invoice['sign_by'].patchValue({ date: new Date(_date.year, _date.month - 1, _date.day) });
    _date = this.form.value.deliver_to.expected_delivery_date;
    if (_date) {
      this.invoice['deliver_to'].patchValue({
        expected_delivery_date: new Date(_date.year, _date.month - 1, _date.day)
      });
    }
    _date = this.form.value.date_created;
    this.form.patchValue({ date_created: new Date(_date.year, _date.month - 1, _date.day) });
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoiceEvent.emit(this.newInvoice);
  }

  checkProducts() {
    this.productsValid = false;
  }
}
