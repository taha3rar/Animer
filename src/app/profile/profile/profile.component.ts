import { SpinnerToggleService } from './../../shared/services/spinner-toggle.service';
import { AlertsService } from './../../core/alerts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Credentials } from '../../core/models/user/login-models';
import { defaultValues } from '@app/shared/helpers/default_values';
import { User } from '@avenews/agt-sdk';
declare const $: any;

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
      firstName: [this.user.personalInformation.firstName, Validators.required],
      lastName: [this.user.personalInformation.lastName, Validators.required],
      email: [this.user.personalInformation.email, [Validators.email]],
      phoneNumber: [this.user.personalInformation.phoneNumber],
      jobTitle: [this.user.personalInformation.jobTitle],
      bio: [this.user.personalInformation.bio],
      userId: [this.user.personalInformation.nationalId]
    });
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [this.user.companyInformation.companyName],
      companyNumber: [this.user.companyInformation.companyRegisteredNumber],
      stateRegionProvince: [this.user.companyInformation.stateProvinceRegion],
      address: [this.user.companyInformation.street],
      city: [this.user.companyInformation.city],
      zipcode: [this.user.companyInformation.zipcode],
      country: [this.user.companyInformation.country, [Validators.required]],
      bio: [this.user.companyInformation.bio]
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
    if (this.credentials && this.credentials.user && this.credentials.user.personalInformation.profilePicture) {
      return this.credentials.user.personalInformation.profilePicture;
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
    this.user.personalInformation.firstName = this.contactf.firstName.value;
    this.user.personalInformation.lastName = this.contactf.lastName.value;
    this.user.personalInformation.email = this.contactf.email.value;
    this.user.personalInformation.nationalId = this.contactf.userId.value;
    this.user.personalInformation.phoneNumber = this.contactf.phoneNumber.value;
    this.user.personalInformation.jobTitle = this.contactf.jobTitle.value;
    this.user.personalInformation.bio = this.contactf.bio.value;
    this.userService.update(this.currentUserId, this.user).subscribe(data => {
      this.spinnerService.hideSpinner();
      const credentialsToUpdate = this.authenticationService.credentials;
      // credentialsToUpdate.user.personalInformation = data.personalInformation; // TODO!
      credentialsToUpdate.user.personalInformation.email = data.personalInformation.email;
      this.authenticationService.setCredentials(credentialsToUpdate);
      this.userService.saveReviewAccountProgress(this.currentUserId).subscribe();
      this.alerts.showAlert('Your profile has been updated!');
    });
  }

  onSubmitCompanyDetails() {
    this.spinnerService.showSpinner();
    this.user.companyInformation.companyName = this.companyf.companyName.value;
    this.user.companyInformation.companyRegisteredNumber = this.companyf.companyNumber.value;
    this.user.companyInformation.stateProvinceRegion = this.companyf.stateRegionProvince.value;
    this.user.companyInformation.street = this.companyf.address.value;
    this.user.companyInformation.city = this.companyf.city.value;
    this.user.companyInformation.zipcode = this.companyf.zipcode.value;
    this.user.companyInformation.country = this.companyf.country.value;
    this.user.companyInformation.bio = this.companyf.bio.value;
    this.userService.update(this.currentUserId, this.user).subscribe(data => {
      this.spinnerService.hideSpinner();
      this.alerts.showAlert('Changes saved!');
      this.userService.saveReviewAccountProgress(this.currentUserId).subscribe();
    });
  }
}
