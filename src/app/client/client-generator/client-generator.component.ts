import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { User } from '../../core/models/user/user';

declare const $: any;

@Component({
  selector: 'app-client-generator',
  templateUrl: './client-generator.component.html',
  styleUrls: ['./client-generator.component.scss']
})
export class ClientGeneratorComponent implements OnInit {
  public invitedClient: User = new User();
  clientDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.clientDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileType: this.formBuilder.array([], Validators.required),
      phoneNumber: ['', [Validators.required]],
      contactTypes: this.formBuilder.array([], Validators.required)
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
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
    } else {
      const index = contactTypesFormArray.controls.findIndex(x => x.value === contactType);
      contactTypesFormArray.removeAt(index);
    }
  }

  onChangeProfileType(profilType: string, isChecked: boolean) {
    const profileTypeFormArray = <FormArray>this.clientDetailsForm.controls.profileType;

    if (isChecked) {
      profileTypeFormArray.removeAt(0);
      profileTypeFormArray.push(new FormControl(profilType));
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
      this.router.navigateByUrl('/client');
    });
  }
}
