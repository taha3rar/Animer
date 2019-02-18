import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { StepperService } from '@app/core/stepper.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { User } from '../../core/models/user/user';
import { Ecosystem } from '@app/core/models/ecosystem';
import { Client } from '@app/core/models/user/client';
import { EcosystemService } from '@app/core';

declare const $: any;

@Component({
  selector: 'app-client-generator',
  templateUrl: './client-generator.component.html',
  styleUrls: ['./client-generator.component.scss']
})
export class ClientGeneratorComponent extends BaseValidationComponent implements OnInit {
  invitedClient: User = new User();
  clientDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;
  ecosystems: Ecosystem[];
  ecosystemsToBeAdded: Ecosystem[] = [];
  @ViewChild('closeModal')
  closeModal: ElementRef;

  constructor(
    private userService: UserService,
    private ecosystemService: EcosystemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stepperService: StepperService
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(({ ecosystems }) => {
      this.ecosystems = ecosystems;
    });

    this.clientDetailsForm = this.formBuilder.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      email: [undefined, [Validators.email]],
      profileType: this.formBuilder.array([], Validators.required),
      phoneNumber: [undefined],
      contactTypes: this.formBuilder.array([], Validators.required)
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [undefined, [Validators.required]],
      address: [undefined, [Validators.required]],
      city: [undefined, [Validators.required]],
      zipcode: [undefined, [Validators.required]],
      country: [undefined, [Validators.required]]
    });
    this.stepperService.stepperInit();
    this.formInput = this.clientDetailsForm;
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
  get clientf() {
    return this.clientDetailsForm.controls;
  }
  get companyf() {
    return this.companyDetailsForm.controls;
  }

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

  pushEcosystem(ecosystem: Ecosystem) {
    const idx = this.ecosystemsToBeAdded.indexOf(ecosystem);
    if (idx > -1) {
      this.ecosystemsToBeAdded.splice(idx, 1);
    } else {
      this.ecosystemsToBeAdded.push(ecosystem);
    }
  }

  onGeneralSubmit() {
    this.invitedClient.personal_information.first_name = this.clientf.firstName.value;
    this.invitedClient.personal_information.last_name = this.clientf.lastName.value;
    this.invitedClient.email = this.clientf.email.value;
    this.invitedClient.personal_information.phone_number = this.clientf.phoneNumber.value;
    this.invitedClient.roles = this.clientf.profileType.value;
    this.invitedClient.contact_by = this.clientf.contactTypes.value;
    this.invitedClient.company_information.company_name = this.companyf.companyName.value;
    this.invitedClient.company_information.street = this.companyf.address.value;
    this.invitedClient.company_information.city = this.companyf.city.value;
    this.invitedClient.company_information.zipcode = this.companyf.zipcode.value;
    this.invitedClient.company_information.country = this.companyf.country.value;

    this.userService.saveInvitedClient(this.invitedClient).subscribe(data => {
      if (data._id) {
        const participant = new Client(data);
        if (this.ecosystemsToBeAdded.length) {
          this.ecosystemService.addParticipantToEcosystems(participant, this.ecosystemsToBeAdded).subscribe(() => {
            this.closeAndRefresh();
          });
        } else {
          this.closeAndRefresh();
        }
      } else {
        console.log(data); // TODO: Manage errors
      }
    });
  }

  closeAndRefresh(): any {
    this.closeModal.nativeElement.click();
    this.router.navigate([this.router.url]);
  }

  isFieldInvalidComp(field: string) {
    return this.companyDetailsForm.get(field).invalid && this.companyDetailsForm.get(field).touched;
  }

  showFieldStyleComp(field: string) {
    return {
      'has-error': this.isFieldInvalidComp(field)
    };
  }
}
