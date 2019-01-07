import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { User } from '../../core/models/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  clientDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['currentUser'];
    this.clientDetailsForm = this.formBuilder.group({
      firstName: [this.user.personal_information.first_name, Validators.required],
      lastName: [this.user.personal_information.last_name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.personal_information.phone_number, [Validators.required]],
      jobTitle: [this.user.personal_information.job_title],
      bio: [this.user.personal_information.bio]
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [this.user.company_information.company_name, [Validators.required]],
      companyNumber: [this.user.company_information.company_registered_number, [Validators.required]],
      email: [this.user.company_information.company_email, [Validators.email]],
      phoneNumber: [this.user.company_information.phone],
      address: [this.user.company_information.street, [Validators.required]],
      city: [this.user.company_information.city, [Validators.required]],
      zipcode: [this.user.company_information.zipcode, [Validators.required]],
      country: [this.user.company_information.country, [Validators.required]],
      bio: [this.user.company_information.bio]
    });
  }

  // Easier acces to form values
  get clientf() {
    return this.clientDetailsForm.controls;
  }
  get companyf() {
    return this.companyDetailsForm.controls;
  }

  onSubmitClientDetails() {
    this.user.personal_information.first_name = this.clientf.firstName.value;
    this.user.personal_information.last_name = this.clientf.lastName.value;
    this.user.email = this.clientf.email.value;
    this.user.personal_information.phone_number = this.clientf.phoneNumber.value;
    this.user.personal_information.job_title = this.clientf.jobTitle.value;
    this.user.personal_information.bio = this.clientf.bio.value;
    this.userService.update(this.authenticationService.currentUserId, this.user).subscribe(data => {});
  }

  onSubmitCompanyDetails() {
    this.user.company_information.company_name = this.companyf.companyName.value;
    this.user.company_information.company_registered_number = this.companyf.companyNumber.value;
    this.user.company_information.company_email = this.companyf.email.value;
    this.user.company_information.phone = this.companyf.phoneNumber.value;
    this.user.company_information.street = this.companyf.address.value;
    this.user.company_information.city = this.companyf.city.value;
    this.user.company_information.zipcode = this.companyf.zipcode.value;
    this.user.company_information.country = this.companyf.country.value;
    this.user.company_information.bio = this.companyf.bio.value;
    this.userService.update(this.authenticationService.currentUserId, this.user).subscribe(data => {});
  }
}
