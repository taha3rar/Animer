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
  idDocumentReceived: boolean;
  certOfIncoReceived: boolean;
  userDPOInfo: DpoInformation = new DpoInformation();
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alerts: AlertsService
  ) {
    super();
    this.dpoForm = this.fb.group({
      companyName: [undefined, Validators.required],
      companyRegistrationNo: [undefined, Validators.required],
      tradeName: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
      address: [undefined, Validators.required],
      city: [undefined, Validators.required],
      country: [undefined, Validators.required],
      websiteURL: [undefined],
      companyEmail: [undefined, [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ currentUser }) => {
      this.user = currentUser;

      this.userId = this.user._id;
      if (this.user.dpo) {
        this.applicationStatus = this.user.dpo.status;
      }
      if (this.user.dpo) {
        // temporary
        this.dpoForm.patchValue({
          companyName: this.user.dpo.company_name,
          companyRegistrationNo: this.user.dpo.registration_number,
          tradeName: this.user.dpo.trade_name,
          phoneNumber: this.user.dpo.phone_number,
          address: this.user.dpo.address,
          city: this.user.dpo.city,
          country: this.user.dpo.country,
          websiteURL: this.user.dpo.website,
          companyEmail: this.user.dpo.company_email
        });
      }

      this.formInput = this.dpoForm;

      if (this.user.dpo && this.user.dpo.status) {
        this.dpoForm.disable();
      }
    });
    this.formInput = this.dpoForm;
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

    if (this.dpoForm.valid && this.termsAccepted && this.idDocumentReceived && this.certOfIncoReceived) {
      this.userService.saveUserDPOInformation(this.userDPOInfo, this.userId).subscribe(res => {
        this.alerts.showAlert('Your information has been sent successfully!');
        this.router.navigateByUrl('/profile');
        this.dpoForm.disable();
      });
    } else if (!this.idDocumentReceived || !this.certOfIncoReceived) {
      this.checkDocuments();
    } else {
      this.acceptTermsPopup();
    }
  }

  receiveDocuments($event: any) {
    this.documentsArray.push($event);
    this.checkDocuments();
  }

  checkDocuments() {
    this.documentsArray.find((x: any) => x.file_type === 'ID')
      ? (this.idDocumentReceived = true)
      : (this.idDocumentReceived = false);

    this.documentsArray.find((x: any) => x.file_type === 'certificate_of_inco')
      ? (this.certOfIncoReceived = true)
      : (this.certOfIncoReceived = false);
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
