import { SpinnerToggleService } from './../../shared/services/spinner-toggle.service';
import { AlertsService } from './../../core/alerts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { User } from '../../core/models/user/user';
import { Credentials } from '../../core/models/user/login-models';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  currentUserId: string;
  contactDetailsForm: FormGroup;
  companyDetailsForm: FormGroup;
  credentials: Credentials;
  showPaymentSection = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private spinnerService: SpinnerToggleService
  ) {}

  ngOnInit() {
    this.credentials = this.authenticationService.credentials;
    this.currentUserId = this.authenticationService.currentUserId;
    this.user = this.route.snapshot.data['currentUser'];
    this.showPaymentSection = this.route.snapshot.params.flag ? true : false;
    this.contactDetailsForm = this.formBuilder.group({
      firstName: [this.user.personal_information.first_name, Validators.required],
      lastName: [this.user.personal_information.last_name, Validators.required],
      email: [this.user.email, [Validators.email]],
      phoneNumber: [this.user.personal_information.phone_number],
      jobTitle: [this.user.personal_information.job_title],
      bio: [this.user.personal_information.bio],
      userId: [this.user.user_personal_id]
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [this.user.company_information.company_name],
      companyNumber: [this.user.company_information.company_registered_number],
      stateRegionProvince: [this.user.company_information.state_province_region],
      address: [this.user.company_information.street],
      city: [this.user.company_information.city],
      zipcode: [this.user.company_information.zipcode],
      country: [this.user.company_information.country, [Validators.required]],
      bio: [this.user.company_information.bio]
    });

    $('.collapse')
      .on('shown.bs.collapse', function() {
        $(this)
          .parent()
          .find('.glyphicon-plus')
          .removeClass('glyphicon-plus')
          .addClass('glyphicon-minus');
      })
      .on('hidden.bs.collapse', function() {
        $(this)
          .parent()
          .find('.glyphicon-minus')
          .removeClass('glyphicon-minus')
          .addClass('glyphicon-plus');
      });
    this.userService.saveReviewAccountProgress(this.currentUserId).subscribe();
  }

  // Easier acces to form values
  get contactf() {
    return this.contactDetailsForm.controls;
  }
  get companyf() {
    return this.companyDetailsForm.controls;
  }

  get userRole() {
    return this.user.roles[0];
  }

  get profilePicture(): string | null {
    if (this.credentials && this.credentials.user && this.credentials.user.personal_information.profile_picture) {
      return this.credentials.user.personal_information.profile_picture;
    }
    return defaultValues.profile_picture;
  }

  isFieldInvalid(field: string) {
    return this.contactDetailsForm.get(field).invalid && this.contactDetailsForm.get(field).touched;
  }

  showFieldStyle(field: string) {
    return {
      'has-error': this.isFieldInvalid(field)
    };
  }

  isFieldInvalidComp(field: string) {
    return this.companyDetailsForm.get(field).invalid && this.companyDetailsForm.get(field).touched;
  }

  showFieldStyleComp(field: string) {
    return {
      'has-error': this.isFieldInvalidComp(field)
    };
  }

  onSubmitContactDetails() {
    this.spinnerService.showSpinner();
    this.user.personal_information.first_name = this.contactf.firstName.value;
    this.user.personal_information.last_name = this.contactf.lastName.value;
    this.user.email = this.contactf.email.value;
    this.user.user_personal_id = this.contactf.userId.value;
    this.user.personal_information.phone_number = this.contactf.phoneNumber.value;
    this.user.personal_information.job_title = this.contactf.jobTitle.value;
    this.user.personal_information.bio = this.contactf.bio.value;
    this.userService.update(this.currentUserId, this.user).subscribe(data => {
      this.spinnerService.hideSpinner();
      const credentialsToUpdate = this.authenticationService.credentials;
      credentialsToUpdate.user.personal_information = data.personal_information;
      credentialsToUpdate.user.email = data.email;
      this.authenticationService.setCredentials(credentialsToUpdate);
      this.userService.saveReviewAccountProgress(this.currentUserId).subscribe();
      this.alerts.showAlert('Your profile has been updated!');
    });
  }

  onSubmitCompanyDetails() {
    this.spinnerService.showSpinner();
    this.user.company_information.company_name = this.companyf.companyName.value;
    this.user.company_information.company_registered_number = this.companyf.companyNumber.value;
    this.user.company_information.state_province_region = this.companyf.stateRegionProvince.value;
    this.user.company_information.street = this.companyf.address.value;
    this.user.company_information.city = this.companyf.city.value;
    this.user.company_information.zipcode = this.companyf.zipcode.value;
    this.user.company_information.country = this.companyf.country.value;
    this.user.company_information.bio = this.companyf.bio.value;
    this.userService.update(this.currentUserId, this.user).subscribe(data => {
      this.spinnerService.hideSpinner();
      this.alerts.showAlert('Changes saved!');
      this.userService.saveReviewAccountProgress(this.currentUserId).subscribe();
    });
  }
}
