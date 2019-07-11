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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  validBy: NgbDateStruct;
  issuedOn: NgbDateStruct;
  deliveryOn: NgbDateStruct;

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
    this.validBy = this.formInput.value.sign_by.date;
    this.issuedOn = this.formInput.value.date_created;
    this.deliveryOn = this.formInput.value.deliver_to.expected_delivery_date;
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

  dateUpdate(dateName: string, dateUpdated: NgbDateStruct, dateForm?: string) {
    if (dateUpdated) {
      dateForm
        ? this.invoice[dateForm].patchValue({
            [dateName]: new Date(dateUpdated.year, dateUpdated.month - 1, dateUpdated.day).toJSON()
          })
        : this.form.patchValue({
            [dateName]: new Date(dateUpdated.year, dateUpdated.month - 1, dateUpdated.day).toJSON()
          });
    } else {
      dateForm ? this.invoice[dateForm].patchValue({ [dateName]: null }) : this.form.patchValue({ [dateName]: null });
    }
  }

  preSubmit() {
    if (this.validBy) {
      this.invoice['sign_by'].patchValue({
        date: new Date(this.validBy.year, this.validBy.month - 1, this.validBy.day).toJSON()
      });
    } else {
      this.invoice['sign_by'].patchValue({ date: null });
    }
    if (this.deliveryOn) {
      this.invoice['deliver_to'].patchValue({
        expected_delivery_date: new Date(this.deliveryOn.year, this.deliveryOn.month - 1, this.deliveryOn.day).toJSON()
      });
    } else {
      this.invoice['deliver_to'].patchValue({ expected_delivery_date: null });
    }
    this.issuedOn
      ? this.form.patchValue({
          date_created: new Date(this.issuedOn.year, this.issuedOn.month - 1, this.issuedOn.day).toJSON()
        })
      : this.form.patchValue({ date_created: new Date().toJSON() });
  }

  draftInvoice() {
    this.disableSubmitButton(true);
    this.preSubmit();
    this.savedAsDraft.emit(true);
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoice.draft = true;
    this.disableSubmitButton(true);
    if (!this.draft) {
      this.invoiceService.draft(this.newInvoice).subscribe(
        () => {
          this.alerts.showAlert('Your proforma invoice has been saved as a draft!');
          this.router.navigateByUrl('/invoice/list');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    } else {
      this.invoiceService.update(this.newInvoice._id, this.newInvoice).subscribe(
        () => {
          this.alerts.showAlert('Your proforma invoice has been saved as a draft!');
          this.router.navigateByUrl('/invoice/list');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    }
  }

  toReview() {
    this.preSubmit();
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoiceEvent.emit(this.newInvoice);
  }

  checkProducts() {
    this.productsValid = false;
  }
}
