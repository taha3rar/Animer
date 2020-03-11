import { BaseValidationComponent } from './../../shared/components/base-validation/base-validation.component';
import { AlertsService } from './../../core/alerts.service';
import { UserService } from './../../core/api/user.service';
import { countries } from './../../shared/helpers/countries';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DpoInformation } from '@app/core/models/user/dpo-info';
import swal from 'sweetalert';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss']
})
export class PaymentSettingsComponent extends BaseValidationComponent implements OnInit {
  dpoForm: FormGroup;
  user: any;
  userId: string;
  countries = countries;
  @Input() showPaymentSection = false;
  applicationStatus: string;
  documentsArray: any = [];
  termsAccepted = false;
  idDocumentReceived = false;
  markDocumentAsIncorrect = false;
  userDPOInfo: DpoInformation = new DpoInformation();
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alerts: AlertsService
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(({ currentUser }) => {
      this.user = currentUser;
    });

    this.userId = this.user._id;
    this.applicationStatus = this.user.dpo.status;
    this.dpoForm = this.fb.group({
      companyName: [this.user.dpo.company_name, Validators.required],
      companyRegistrationNo: [this.user.dpo.registration_number, Validators.required],
      tradeName: [this.user.dpo.trade_name, Validators.required],
      phoneNumber: [this.user.dpo.phone_number, Validators.required],
      address: [this.user.dpo.address, Validators.required],
      city: [this.user.dpo.city, Validators.required],
      country: [this.user.dpo.country, Validators.required],
      websiteURL: [this.user.dpo.website, Validators.required],
      companyEmail: [this.user.dpo.company_email, [Validators.email, Validators.required]]
    });

    this.formInput = this.dpoForm;

    if (this.user.dpo.status && this.user.dpo) {
      this.dpoForm.disable();
    }
  }

  get userInfo() {
    return this.dpoForm.controls;
  }

  onApplicationSubmit() {
    this.userDPOInfo.address = this.userInfo.address.value;
    this.userDPOInfo.company_name = this.userInfo.companyName.value;
    this.userDPOInfo.company_email = this.userInfo.companyEmail.value;
    this.userDPOInfo.registration_number = this.userInfo.companyRegistrationNo.value;
    this.userDPOInfo.country = this.userInfo.country.value;
    this.userDPOInfo.phone_number = this.userInfo.phoneNumber.value;
    this.userDPOInfo.city = this.userInfo.city.value;
    this.userDPOInfo.website = this.userInfo.websiteURL.value;
    this.userDPOInfo.trade_name = this.userInfo.tradeName.value;
    this.userDPOInfo.country = this.userInfo.country.value;
    this.userDPOInfo.documents = this.documentsArray;

    if (this.dpoForm.valid && this.termsAccepted && this.idDocumentReceived) {
      this.userService.saveUserDPOInformation(this.userDPOInfo, this.userId).subscribe(res => {
        this.alerts.showAlert('Your information has been sent successfully!');
      });
    } else if (!this.idDocumentReceived) {
      this.markDocumentAsIncorrect = true;
    } else {
      this.acceptTermsPopup();
    }
  }

  receiveDocuments($event: any) {
    this.documentsArray.push($event);
    if (this.documentsArray.find((x: any) => x.file_type === 'ID')) {
      this.idDocumentReceived = true;
      this.markDocumentAsIncorrect = false;
    }
  }

  acceptTerms($event: any) {
    $event.target.checked ? (this.termsAccepted = true) : (this.termsAccepted = false);
  }

  acceptTermsPopup() {
    swal({
      title: 'Just one more thing!',
      icon: 'warning',
      text: 'Please read and accept DPO terms and conditions',
      buttons: [true, 'OK']
    });
  }
}
