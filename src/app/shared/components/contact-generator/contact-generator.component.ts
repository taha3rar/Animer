import { SpinnerToggleService } from './../../services/spinner-toggle.service';
import { UserService } from './../../../core/api/user.service';
import { User } from './../../../core/models/user/user';
import { StepperService } from '@app/core/stepper.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import swal from 'sweetalert';
import { AlertsService } from '@app/core/alerts.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { defaultValues } from '@app/shared/helpers/default_values';

declare const $: any;

@Component({
  selector: 'app-contact-generator',
  templateUrl: './contact-generator.component.html',
  styleUrls: ['./contact-generator.component.scss']
})
export class ContactGeneratorComponent extends BaseValidationComponent implements OnInit {
  currentUser: User;
  invitedContact: User = new User();
  contactDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
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
    private stepperService: StepperService,
    private alerts: AlertsService,
    private spinnerService: SpinnerToggleService
  ) {
    super();
  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'US';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);

    this.contactDetailsForm = this.formBuilder.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      email: [undefined, [Validators.email]],
      jobTitle: [undefined],
      user_personal_id: [undefined],
      profileType: this.formBuilder.array([], Validators.required),
      phoneNumber: [undefined],
      contactTypes: this.formBuilder.array([], Validators.required)
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [undefined],
      address: [undefined],
      city: [undefined],
      state_province_region: [undefined],
      zipcode: [undefined],
      country: [undefined, [Validators.required]]
    });
    this.stepperService.stepperInit();
    this.formInput = this.contactDetailsForm;

    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  get contactf() {
    return this.contactDetailsForm.controls;
  }

  get companyf() {
    return this.companyDetailsForm.controls;
  }

  isRequired(abstractControl: AbstractControl) {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName]) {
          if (this.isRequired(abstractControl['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  targetStep(step: string) {
    const tab = $('a[href="#' + step + '"]');
    $(tab).click();
  }

  // Easier acces to form values

  onChangeContactType(contactType: string, isChecked: boolean) {
    const contactTypesFormArray = <FormArray>this.contactDetailsForm.controls.contactTypes;
    if (isChecked) {
      contactTypesFormArray.push(new FormControl(contactType));
      if (contactType === 'email') {
        this.contactf.email.setValidators([Validators.required, Validators.email]);
        this.contactf.email.updateValueAndValidity();
      } else {
        this.contactf.phoneNumber.setValidators([Validators.required]);
        this.contactf.phoneNumber.updateValueAndValidity();
      }
    } else {
      const index = contactTypesFormArray.controls.findIndex(x => x.value === contactType);
      contactTypesFormArray.removeAt(index);
      if (contactType === 'email') {
        this.contactf.email.setValidators([Validators.email]);
        this.contactf.email.updateValueAndValidity();
      } else {
        this.contactf.phoneNumber.setValidators([]);
        this.contactf.phoneNumber.updateValueAndValidity();
      }
    }
  }

  onChangeProfileType(profileType: string, isChecked: boolean) {
    const profileTypeFormArray = <FormArray>this.contactDetailsForm.controls.profileType;

    if (isChecked) {
      profileTypeFormArray.removeAt(0);
      profileTypeFormArray.push(new FormControl(profileType));
    }
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

  get contactIdPicture(): string | null {
    return this.idPicture || defaultValues.profile_picture;
  }

  receivePicture($event: any) {
    this.receivePicture = $event;
  }

  receiveId(picture: any) {
    this.idPicture = picture;
  }

  onGeneralSubmit() {
    this.disableSubmitButton(true);
    this.invitedContact.personal_information.first_name = this.contactf.firstName.value;
    this.invitedContact.personal_information.last_name = this.contactf.lastName.value;
    this.invitedContact.email = this.contactf.email.value;
    this.invitedContact.personal_information.job_title = this.contactf.jobTitle.value;
    this.invitedContact.user_personal_id = this.contactf.user_personal_id.value;
    this.invitedContact.personal_information.phone_number = this.contactf.phoneNumber.value;
    this.invitedContact.roles = this.contactf.profileType.value;
    this.invitedContact.contact_by = this.contactf.contactTypes.value;
    this.invitedContact.company_information.company_name = this.companyf.companyName.value;
    this.invitedContact.company_information.street = this.companyf.address.value;
    this.invitedContact.company_information.city = this.companyf.city.value;
    this.invitedContact.company_information.zipcode = this.companyf.zipcode.value;
    this.invitedContact.company_information.country = this.companyf.country.value;
    this.contactSubmitted = true;
    this.spinnerService.showSpinner();

    if (this.idPicture !== defaultValues.profile_picture) {
      this.invitedContact.personal_information.id_picture = this.idPicture;
    }
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

  markAsTouched(formControl: string) {
    this.contactDetailsForm.get(formControl).markAsTouched();
  }

  closeAndRefresh(): any {
    $('#addContactWizard').fadeOut('fast');
    this.resetForm();
    this.idPicture = undefined;
    this.router.navigate([this.router.url]);
  }

  resetForm() {
    this.contactDetailsForm.reset();
    this.companyDetailsForm.reset();
    this.contactDetailsForm.controls.phoneNumber.clearValidators();
    this.contactDetailsForm.controls.email.clearValidators();
    this.contactDetailsForm.controls.email.setValidators([Validators.email]);
    this.contactDetailsForm.controls.contactTypes.setErrors({ incorrect: true });
    this.contactDetailsForm.controls.profileType.setErrors({ incorrect: true });

    $('.stepper')
      .find('li.completed:not(:first-child)')
      .addClass('disabled');
    $('.stepper')
      .find('li.completed')
      .removeClass('completed');
    $('.stepper')
      .find('li.active')
      .removeClass('active');
    $('.stepper')
      .find('li:first-child')
      .addClass('active');
    $('.stepper')
      .find('.tab-pane.active')
      .removeClass('active');
    $('.stepper')
      .find('.tab-pane:first-child')
      .addClass('active');
    $('.checkbox').prop('checked', false);
    $('.form_radio').prop('checked', false);
    $('input[type=tel]').val('');
    this.contactSubmitted = false;
  }

  onModalClose() {
    if (!this.contactSubmitted && this.contactDetailsForm.dirty) {
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

  isFieldInvalidComp(field: string) {
    return this.companyDetailsForm.get(field).invalid && this.companyDetailsForm.get(field).touched;
  }

  showFieldStyleComp(field: string) {
    return {
      'has-error': this.isFieldInvalidComp(field)
    };
  }

  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
}
