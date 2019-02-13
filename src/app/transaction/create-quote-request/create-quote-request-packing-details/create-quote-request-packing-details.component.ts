import { BaseValidationComponent } from './../../../shared/components/base-validation/base-validation.component';
import { Component, OnInit, Input } from '@angular/core';
import { packageUnits, containerType } from '@app/shared/helpers/packaging_details';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quote-request-packing-details',
  templateUrl: './create-quote-request-packing-details.component.html',
  styleUrls: ['./create-quote-request-packing-details.component.scss']
})
export class CreateQuoteRequestPackingDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  units = packageUnits;
  containerTypes = containerType;
  packingDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.packingDetailsForm = this.formBuilder.group({
      container_details: [true, Validators.required],
      packing_details: [true, Validators.required],
      container_type: ['', Validators.required],
      container_quantity: ['', Validators.required],
      type_of_package: ['', Validators.required],
      package_weight: ['', Validators.required],
      weight_unit: ['', Validators.required],
      package_quantity: ['', Validators.required],
      total_weight: [undefined, Validators.required],
      additional_details: ['']
    });

    this.packingDetailsForm.get('container_details').valueChanges.subscribe(containerDetails => {
      if (containerDetails) {
        this.packingDetailsForm.get('packing_details').enable({ emitEvent: false });
        this.packingDetailsForm.get('container_type').enable();
        this.packingDetailsForm.get('container_type').setValidators([Validators.required]);
        this.packingDetailsForm.get('container_quantity').enable();
        this.packingDetailsForm.get('container_quantity').setValidators([Validators.required]);
      } else {
        this.packingDetailsForm.get('packing_details').disable();
        this.packingDetailsForm.get('container_type').disable();
        this.packingDetailsForm.get('container_type').setValue('');
        this.packingDetailsForm.get('container_quantity').disable();
        this.packingDetailsForm.get('container_quantity').setValue('');
      }
    });

    this.packingDetailsForm.get('packing_details').valueChanges.subscribe(packingDetails => {
      if (packingDetails) {
        this.packingDetailsForm.get('container_details').enable({ emitEvent: false });
        this.packingDetailsForm.get('type_of_package').enable();
        this.packingDetailsForm.get('type_of_package').setValidators([Validators.required]);
        this.packingDetailsForm.get('package_weight').enable();
        this.packingDetailsForm.get('package_weight').setValidators([Validators.required]);
        this.packingDetailsForm.get('weight_unit').enable();
        this.packingDetailsForm.get('weight_unit').setValidators([Validators.required]);
        this.packingDetailsForm.get('package_quantity').enable();
        this.packingDetailsForm.get('package_quantity').setValidators([Validators.required]);
        this.packingDetailsForm.get('total_weight').enable();
        this.packingDetailsForm.get('total_weight').setValidators([Validators.required]);
      } else {
        this.packingDetailsForm.get('container_details').disable();
        this.packingDetailsForm.get('type_of_package').disable();
        this.packingDetailsForm.get('type_of_package').setValue('');
        this.packingDetailsForm.get('package_weight').disable();
        this.packingDetailsForm.get('package_weight').setValue('');
        this.packingDetailsForm.get('weight_unit').disable();
        this.packingDetailsForm.get('weight_unit').setValue('');
        this.packingDetailsForm.get('package_quantity').disable();
        this.packingDetailsForm.get('package_quantity').setValue('');
        this.packingDetailsForm.get('total_weight').disable();
        this.packingDetailsForm.get('total_weight').setValue('');
      }
    });
    this.onChanges();
    this.formInput = this.packingDetailsForm;
  }

  onChanges(): void {
    this.packingDetailsForm.get('package_weight').valueChanges.subscribe(val => {
      this.setTotalWeight();
    });
    this.packingDetailsForm.get('package_quantity').valueChanges.subscribe(val => {
      this.setTotalWeight();
    });
  }

  get packingDetailsf() {
    return this.packingDetailsForm.controls;
  }

  setTotalWeight() {
    if (this.packingDetailsf.package_weight.value && this.packingDetailsf.package_quantity.value) {
      this.packingDetailsf['total_weight'].setValue(
        Number((this.packingDetailsf.package_weight.value * this.packingDetailsf.package_quantity.value).toFixed(2))
      );
    } else {
      this.packingDetailsf['total_weight'].setValue(undefined);
    }
  }

  next() {
    this.quoteRequest.packing_details = this.packingDetailsf.additional_details.value;
    this.quoteRequest.type_of_package = this.packingDetailsf.type_of_package.value;
    this.quoteRequest.package_weight = this.packingDetailsf.package_weight.value;
    this.quoteRequest.weight_unit = this.packingDetailsf.weight_unit.value;
    this.quoteRequest.quantity = this.packingDetailsf.package_quantity.value;
    this.quoteRequest.total_weight = this.packingDetailsf.total_weight.value;
    this.quoteRequest.container_type = this.packingDetailsf.container_type.value;
    this.quoteRequest.container_quantity = this.packingDetailsf.container_quantity.value;
  }
}
