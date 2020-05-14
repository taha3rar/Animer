import { SdkService } from './../../../core/sdk.service';
import { SpinnerToggleService } from './../../services/spinner-toggle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import { AlertsService } from '@app/core/alerts.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { defaultValues } from '@app/shared/helpers/default_values';
declare const $: any;
import { PhoneNumberValidator } from '@app/core/validators/phone.validator';
import { User, RegisterContactDTO, Contact } from '@avenews/agt-sdk';
import { UpdateContactDTO } from '@avenews/agt-sdk/lib/types/contact';
@Component({
  selector: 'app-contact-generator',
  templateUrl: './contact-generator.component.html',
  styleUrls: ['./contact-generator.component.scss']
})
export class ContactGeneratorComponent extends BaseValidationComponent implements OnInit, OnChanges {
  currentUser: User;
  invitedContact = {};
  contactDetailsForm: FormGroup;
  countries = countries;
  phoneUtil: any;
  regionCode = 'KES';
  @Output() contactEmit = new EventEmitter<Contact>();
  @Input() contact: Contact;
  @Input() isEdit: boolean;
  @Input() isGrn: boolean;
  phoneCode: string;
  newContact: RegisterContactDTO; // TODO new client model
  partialPhoneNumber: string;
  @ViewChild('closeModal')
  closeModal: ElementRef;
  contactSubmitted = false;
  idPicture = defaultValues.profile_picture;
  hasEcosystem = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sdkService: SdkService,
    private alerts: AlertsService,
    private spinnerService: SpinnerToggleService
  ) {
    super();
  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KES';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    this.contactDetailsForm = this.formBuilder.group({
      fullName: [undefined, Validators.required],
      nationalId: [undefined],
      businessName: [undefined],
      phoneNumber: [undefined, [Validators.required, PhoneNumberValidator(this.regionCode)]],
      email: [undefined, [Validators.required, Validators.email]],
      country: [undefined, Validators.required],
      region: [undefined],
      location: [undefined],
      address: [undefined]
    });
    this.formInput = this.contactDetailsForm;
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdit'] || changes['contact']) {
      if (this.isEdit && this.contact) {
        this.contactDetailsForm.patchValue({
          fullName: this.contact.fullName,
          nationalId: this.contact.nationalId,
          businessName: this.contact.businessName,
          phoneNumber: this.contact.phoneNumber,
          email: this.contact.email,
          country: this.contact.country,
          region: this.contact.region,
          location: this.contact.location,
          address: this.contact.address
        });
      }
    }
  }
  get contactf() {
    return this.contactDetailsForm.controls;
  }

  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.contactDetailsForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.contactDetailsForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
  }

  onGeneralSubmit() {
    this.onSubmit(this.contactDetailsForm);
    if (this.contactf && this.contactDetailsForm.valid) {
      this.disableSubmitButton(true);
      const newContact: RegisterContactDTO = {
        fullName: this.contactf.fullName.value,
        nationalId: this.contactf.nationalId.value,
        businessName: this.contactf.businessName.value,
        phoneNumber: this.contactf.phoneNumber.value,
        email: this.contactf.email.value,
        country: this.contactf.country.value,
        region: this.contactf.region.value,
        location: this.contactf.location.value,
        address: this.contactf.address.value
      };

      this.contactSubmitted = true;
      this.spinnerService.showSpinner();
      if (!this.isEdit) {
        this.sdkService
          .registerContact(newContact)
          .then(data => {
            if (data._id) {
              if (this.isGrn) {
                this.contactEmit.emit(data);
              }
              this.spinnerService.hideSpinner();
              this.alerts.showAlert('New contact profile has been created!');
              this.closeAndRefresh();
            }
          })
          .catch(err => {
            this.disableSubmitButton(false);
            this.alerts.showAlertDanger(err.error.message);
          });
      } else {
        const updateContact: UpdateContactDTO = {
          fullName: this.contactf.fullName.value,
          nationalId: this.contactf.nationalId.value,
          businessName: this.contactf.businessName.value,
          phoneNumber: this.contactf.phoneNumber.value,
          email: this.contactf.email.value,
          country: this.contactf.country.value,
          region: this.contactf.region.value,
          location: this.contactf.location.value,
          address: this.contactf.address.value
        };
        this.sdkService
          .updateContact(this.contact._id, updateContact)
          .then(data => {
            if (data._id) {
              this.spinnerService.hideSpinner();
              this.alerts.showAlert('Contact profile has been updated!');
              this.closeAndRefresh();
            }
          })
          .catch(err => {
            this.disableSubmitButton(false);
            this.alerts.showAlertDanger(err.error.message);
          });
      }
    }
  }

  markAsTouched(formControl: string) {
    this.contactDetailsForm.get(formControl).markAsTouched();
  }

  closeAndRefresh(): any {
    $('#addContactWizard').fadeOut('fast');
    this.idPicture = undefined;
    this.deleteData();
    this.router.navigate([this.router.url]);
  }
  deleteData() {
    this.contactDetailsForm.patchValue({
      fullName: undefined,
      nationalId: undefined,
      businessName: undefined,
      phoneNumber: undefined,
      email: undefined,
      country: undefined,
      region: undefined,
      location: undefined,
      address: undefined
    });
    this.newContact = undefined;
  }
  onModalClose() {
    if (!this.contactSubmitted && this.contactDetailsForm.dirty) {
      this.alerts.showAlertBack().then(value => {
        if (value) {
          if (this.isGrn) {
            $('#addContactWizard').fadeOut('fast');
            this.deleteData();
          } else {
            this.closeAndRefresh();
          }
        } else {
          return false;
        }
      });
    } else {
      if (this.isGrn) {
        $('#addContactWizard').fadeOut('fast');
        this.deleteData();
      } else {
        this.closeAndRefresh();
      }
    }
  }

  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
}
