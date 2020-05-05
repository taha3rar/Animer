import { SpinnerToggleService } from './../../services/spinner-toggle.service';
import { UserService } from './../../../core/api/user.service';
import { User } from './../../../core/models/user/user';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import swal from 'sweetalert';
import { AlertsService } from '@app/core/alerts.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { defaultValues } from '@app/shared/helpers/default_values';
declare const $: any;
import { PhoneNumberValidator } from '@app/core/validators/phone.validator';
@Component({
  selector: 'app-contact-generator',
  templateUrl: './contact-generator.component.html',
  styleUrls: ['./contact-generator.component.scss']
})
export class ContactGeneratorComponent extends BaseValidationComponent implements OnInit, OnChanges {
  currentUser: User;
  invitedContact: User = new User();
  contactDetailsForm: FormGroup;
  countries = countries;
  phoneUtil: any;
  regionCode = 'KES';
  // tslint:disable-next-line:no-input-rename
  @Input('contact') contact: any;
  // tslint:disable-next-line:no-input-rename
  @Input('edit') isEdit: boolean;
  phoneCode: string;
  newContact: any; // TODO new client model
  partialPhoneNumber: string;
  @ViewChild('closeModal')
  closeModal: ElementRef;
  contactSubmitted = false;
  idPicture = defaultValues.profile_picture;
  hasEcosystem = true;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
      companyName: [undefined],
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
    if (changes['isEdit']) {
      if (this.isEdit) {
        this.newContact = JSON.parse(this.contact);
        this.contactDetailsForm.patchValue({
          fullName: this.newContact.fullName,
          nationalId: this.newContact.nationalId,
          companyName: this.newContact.companyName,
          phoneNumber: this.newContact.phoneNumber,
          email: this.newContact.email,
          country: this.newContact.country,
          region: this.newContact.region,
          location: this.newContact.location,
          address: this.newContact.address
        });
      }
    }
  }
  get clientf() {
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
    if (!this.isEdit && this.clientf) {
      this.disableSubmitButton(true);
      this.contact.personal_information.first_name = this.clientf.fullName.value;
      this.contact.personal_information.nationalId = this.clientf.nationalId.value;
      this.contact.personal_information.companyName = this.clientf.companyName.value;
      this.contact.phoneNumber = this.clientf.user_personaphoneNumberl_id.value;
      this.contact.email = this.clientf.email.value;
      this.contact.personal_information.country = this.clientf.country.value;
      this.contact.region = this.clientf.region.value;
      this.contact.location = this.clientf.location.value;
      this.contact.address = this.clientf.address.value;
      this.contactSubmitted = true;
      this.spinnerService.showSpinner();
      this.userService.saveInvitedClient(this.invitedContact).subscribe(
        data => {
          if (data._id) {
            this.spinnerService.hideSpinner();
            this.alerts.showAlert('New contact profile has been created!');
            this.closeAndRefresh();
          } else {
            console.log(data); // TODO: Manage errors
          }
        },
        err => {
          this.disableSubmitButton(false);
          $.notify(
            {
              icon: 'notifications',
              message: err.error.message
            },
            {
              type: 'danger',
              timer: 5000,
              placement: {
                from: 'top',
                align: 'right'
              },
              offset: 78
            }
          );
        }
      );
    }
  }

  markAsTouched(formControl: string) {
    this.contactDetailsForm.get(formControl).markAsTouched();
  }

  closeAndRefresh(): any {
    $('#addContactWizard').fadeOut('fast');
    this.idPicture = undefined;
    this.router.navigate([this.router.url]);
  }

  onModalClose() {
    if (!this.contactSubmitted && this.contactDetailsForm.dirty) {
      console.log(this.contactDetailsForm.valid);
      console.log(this.contactDetailsForm.value);
      swal({
        text: 'Are you sure you want to leave this page? All information will be lost!',
        buttons: ['Cancel', 'Yes'],
        icon: 'warning'
      }).then(value => {
        if (value) {
          this.closeAndRefresh();
        } else {
          return false;
        }
      });
    } else {
      this.closeAndRefresh();
    }
  }

  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
}
