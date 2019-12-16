import { UserService } from './../../../core/api/user.service';
import { User } from './../../../core/models/user/user';
import { Ecosystem } from '@app/core/models/ecosystem';
import { Client } from '@app/core/models/user/client';
import { EcosystemService } from '@app/core';
import { StepperService } from '@app/core/stepper.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import swal from 'sweetalert';
import { AlertsService } from '@app/core/alerts.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';

declare const $: any;

@Component({
  selector: 'app-contact-generator',
  templateUrl: './contact-generator.component.html',
  styleUrls: ['./contact-generator.component.scss']
})
export class ContactGeneratorComponent extends BaseValidationComponent implements OnInit {
  currentUser: User;
  invitedClient: User = new User();
  clientDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;
  ecosystems: Ecosystem[];
  ecosystemsToBeAdded: Ecosystem[] = [];
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;
  @ViewChild('closeModal')
  closeModal: ElementRef;
  clientSubmitted = false;

  constructor(
    private userService: UserService,
    private ecosystemService: EcosystemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stepperService: StepperService,
    private alerts: AlertsService
  ) {
    super();
  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];
    this.route.data.subscribe(({ ecosystems }) => {
      this.ecosystems = ecosystems;
    });
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'US';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);

    this.clientDetailsForm = this.formBuilder.group({
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
    this.formInput = this.clientDetailsForm;

    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  get clientf() {
    return this.clientDetailsForm.controls;
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
    const contactTypesFormArray = <FormArray>this.clientDetailsForm.controls.contactTypes;
    if (isChecked) {
      contactTypesFormArray.push(new FormControl(contactType));
      if (contactType === 'email') {
        this.clientf.email.setValidators([Validators.required, Validators.email]);
        this.clientf.email.updateValueAndValidity();
      } else {
        this.clientf.phoneNumber.setValidators([Validators.required]);
        this.clientf.phoneNumber.updateValueAndValidity();
      }
    } else {
      const index = contactTypesFormArray.controls.findIndex(x => x.value === contactType);
      contactTypesFormArray.removeAt(index);
      if (contactType === 'email') {
        this.clientf.email.setValidators([Validators.email]);
        this.clientf.email.updateValueAndValidity();
      } else {
        this.clientf.phoneNumber.setValidators([]);
        this.clientf.phoneNumber.updateValueAndValidity();
      }
    }
  }

  onChangeProfileType(profileType: string, isChecked: boolean) {
    const profileTypeFormArray = <FormArray>this.clientDetailsForm.controls.profileType;

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
      this.clientDetailsForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.clientDetailsForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
  }

  pushEcosystem(ecosystem: Ecosystem) {
    const idx = this.ecosystemsToBeAdded.indexOf(ecosystem);
    if (idx > -1) {
      this.ecosystemsToBeAdded.splice(idx, 1);
    } else {
      this.ecosystemsToBeAdded.push(ecosystem);
    }
  }

  onGeneralSubmit() {
    this.disableSubmitButton(true);
    this.invitedClient.personal_information.first_name = this.clientf.firstName.value;
    this.invitedClient.personal_information.last_name = this.clientf.lastName.value;
    this.invitedClient.email = this.clientf.email.value;
    this.invitedClient.personal_information.job_title = this.clientf.jobTitle.value;
    this.invitedClient.user_personal_id = this.clientf.user_personal_id.value;
    this.invitedClient.personal_information.phone_number = this.clientf.phoneNumber.value;
    this.invitedClient.roles = this.clientf.profileType.value;
    this.invitedClient.contact_by = this.clientf.contactTypes.value;
    this.invitedClient.company_information.company_name = this.companyf.companyName.value;
    this.invitedClient.company_information.street = this.companyf.address.value;
    this.invitedClient.company_information.city = this.companyf.city.value;
    this.invitedClient.company_information.zipcode = this.companyf.zipcode.value;
    this.invitedClient.company_information.country = this.companyf.country.value;
    this.clientSubmitted = true;
    this.userService.saveInvitedClient(this.invitedClient).subscribe(
      data => {
        if (data._id) {
          const participant = new Client(data);
          if (this.ecosystemsToBeAdded.length) {
            this.ecosystemService.addParticipantToEcosystems(participant, this.ecosystemsToBeAdded).subscribe(() => {
              this.alerts.showAlert('New client profile has been created!');
              this.closeAndRefresh();
            });
          } else {
            this.alerts.showAlert('New client profile has been created!');
            this.closeAndRefresh();
          }
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
    this.clientDetailsForm.get(formControl).markAsTouched();
  }

  closeAndRefresh(): any {
    $('#addClientWizard').fadeOut('fast');
    this.resetForm();
    this.router.navigate([this.router.url]);
  }

  resetForm() {
    this.clientDetailsForm.reset();
    this.companyDetailsForm.reset();
    this.clientDetailsForm.controls.phoneNumber.clearValidators();
    this.clientDetailsForm.controls.email.clearValidators();
    this.clientDetailsForm.controls.email.setValidators([Validators.email]);
    this.clientDetailsForm.controls.contactTypes.setErrors({ incorrect: true });
    this.clientDetailsForm.controls.profileType.setErrors({ incorrect: true });
    this.ecosystemsToBeAdded = [];

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
    this.clientSubmitted = false;
  }

  onModalClose() {
    if (!this.clientSubmitted && this.clientDetailsForm.dirty) {
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
