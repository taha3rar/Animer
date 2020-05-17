import { currencies } from './../../../shared/helpers/currencies';
import { measurement } from './../../../shared/helpers/measure';
import { BaseValidationComponent } from './../../../shared/components/base-validation/base-validation.component';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var $: any;
import { Contact } from '@avenews/agt-sdk';
import { GoodsReceivedNoteProduct, Currency } from '@avenews/agt-sdk';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '@app/core/alerts.service';

@Component({
  selector: 'app-grn-product-generator',
  templateUrl: './grn-product-generator.component.html',
  styleUrls: ['./grn-product-generator.component.scss']
})
export class GrnProductGeneratorComponent extends BaseValidationComponent implements OnInit, AfterViewInit, OnChanges {
  selectedContact: Contact;
  productForm: FormGroup;
  measures = measurement;
  disable = false;
  currencies = currencies;
  @Output() addProduct = new EventEmitter<{ product: GoodsReceivedNoteProduct; i: number }>();
  @Input() product: GoodsReceivedNoteProduct;
  @Input() i: number;
  @Input() currency: Currency;
  constructor(private alerts: AlertsService, private formBuilder: FormBuilder) {
    super();
  }
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      measurement: [undefined, Validators.required],
      rate: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      currency: [undefined, Validators.required],
      price: [0, Validators.required],
      description: [undefined]
    });
    if (this.currency) {
      this.disable = true;
      this.productForm.patchValue({
        currency: this.currency
      });
    }
    this.formInput = this.productForm;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      if (this.product) {
        this.productForm.patchValue({
          name: this.product.name,
          measurement: this.product.measurement,
          rate: this.product.rate,
          quantity: this.product.quantity,
          currency: this.product.currency,
          price: this.product.price,
          description: this.product.description
        });
      }
    }
    if (changes['currency']) {
      if (this.currency) {
        this.disable = true;
        this.productForm.patchValue({
          currency: this.currency
        });
      }
    }
  }
  onGeneralSubmit() {
    this.onSubmit(this.productForm);
    if (this.productForm.valid) {
      const product: GoodsReceivedNoteProduct = {
        name: this.productf.name,
        measurement: this.productf.measurement,
        rate: this.productf.rate,
        quantity: this.productf.quantity,
        currency: this.productf.currency,
        price: this.productf.price,
        description: this.productf.description
      };
      this.addProduct.emit({ product: product, i: this.i });
      $('#addGrnProductWizard').fadeOut('fast');
      this.deleteData();
    }
  }
  deleteData() {
    this.productForm.patchValue({
      name: undefined,
      measurement: undefined,
      rate: undefined,
      quantity: undefined,
      currency: this.currency || undefined,
      price: undefined,
      description: undefined
    });
    this.product = undefined;
    this.productForm.markAsUntouched();
  }
  onModalClose() {
    if (this.productForm.dirty) {
      this.alerts.showAlertBack().then(value => {
        if (value) {
          $('#addGrnProductWizard').fadeOut('fast');
          this.deleteData();
        } else {
          return false;
        }
      });
    } else {
      $('#addGrnProductWizard').fadeOut('fast');
      this.deleteData();
    }
  }
  get productf() {
    return this.productForm.value;
  }
  calculator() {
    const rate = this.productForm.controls['rate'];
    const quantity = this.productForm.controls['quantity'];
    if (rate.value === 0 || rate.value === undefined || quantity.value === 0 || quantity.value === undefined) {
      this.productForm.patchValue({
        price: 0
      });
    } else {
      this.productForm.patchValue({
        price: quantity.value * rate.value
      });
    }
  }
  ngAfterViewInit() {
    $('#currency').prop('selectedIndex', -1);
    $('#measurement').prop('selectedIndex', -1);
  }
}
