import { DPOAccount, RegisterDPOAccountDTO } from '@avenews/agt-sdk';
import { SdkService } from './../../core/sdk.service';
import { DashboardDataService } from './../../shared/services/dashboard-data-service';
import { BaseValidationComponent } from './../../shared/components/base-validation/base-validation.component';
import { AlertsService } from './../../core/alerts.service';
import { countries } from './../../shared/helpers/countries';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DpoInformation } from '@app/core/models/user/dpo-info';
import swal from 'sweetalert';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss']
})
export class PaymentSettingsComponent extends BaseValidationComponent implements OnInit, OnChanges, OnDestroy {
  dpoForm: FormGroup;
  user: any;
  userId: string;
  countries = countries;
  @Input() showPaymentSection: boolean;
  applicationStatus: string;
  dpoAccount: DPOAccount;
  termsAccepted = false;
  nationalId: string;
  userTerms: string;
  certOfIncome: string;
  userDPOInfo: DpoInformation = new DpoInformation();
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sdk: SdkService,
    private router: Router,
    private alerts: AlertsService,
    private dashboardDataService: DashboardDataService
  ) {
    super();
    this.dpoForm = this.fb.group({
      companyName: [undefined, Validators.required],
      tradeName: [undefined, Validators.required],
      companyRegistrationNo: [undefined, Validators.required],
      companyEmail: [undefined, [Validators.email, Validators.required]],
      websiteURL: [undefined],
      phoneNumber: [undefined, Validators.required],
      address: [undefined, Validators.required],
      country: [undefined, Validators.required],
      city: [undefined, Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ currentUser, account }) => {
      this.user = currentUser;
      this.dpoAccount = account;
      this.userId = this.user._id;
      if (this.dpoAccount) {
        this.applicationStatus = this.user.dpo.status;
      }
      if (this.dpoAccount) {
        // temporary
        this.dpoForm.patchValue({
          companyName: this.user.dpo.company_name || undefined,
          companyRegistrationNo: this.user.dpo.registration_number || undefined,
          tradeName: this.user.dpo.trade_name || undefined,
          phoneNumber: this.user.dpo.phone_number || undefined,
          address: this.user.dpo.address || undefined,
          city: this.user.dpo.city || undefined,
          country: this.user.dpo.country || undefined,
          websiteURL: this.user.dpo.website || undefined,
          companyEmail: this.user.dpo.company_email || undefined
        });
      }

      this.formInput = this.dpoForm;

      if (this.dpoAccount && this.dpoAccount.status === 'approved') {
        this.dpoForm.disable();
      }
    });
    this.formInput = this.dpoForm;
  }
  ngOnChanges(changes: any) {
    if (changes['showPaymentSection']) {
      if (this.showPaymentSection) {
        this.dashboardDataService.saveIndexByName('payment');
      }
    }
  }
  ngOnDestroy() {
    this.dashboardDataService.saveIndexByName('none');
  }

  get userInfo() {
    return this.dpoForm.controls;
  }

  onApplicationSubmit() {
    if (this.dpoForm.valid && this.termsAccepted && this.nationalId && this.certOfIncome) {
      const dpoAccountRegister: RegisterDPOAccountDTO = {
        companyName: this.userInfo.companyName.value,
        tradeName: this.userInfo.tradeName.value,
        registrationNumber: this.userInfo.companyRegistrationNo.value,
        companyEmail: this.userInfo.companyEmail.value,
        website: this.userInfo.websiteURL.value,
        phoneNumber: this.userInfo.phoneNumber.value,
        address: this.userInfo.address.value,
        country: this.userInfo.country.value,
        city: this.userInfo.city.value,
        nationalIdUrl: this.nationalId,
        certificateOfIncorporationUrl: this.certOfIncome,
        termsAndConditionsUrl: this.userTerms
      };
      this.sdk
        .registerDPOAccount(dpoAccountRegister)
        .then(res => {
          if (res.companyName) {
            this.alerts.showAlert('Your information has been sent successfully!');
            this.router.navigateByUrl('/profile');
            this.dpoForm.disable();
          } else {
            console.log(res);
          } // error?
        })
        .catch(err => {
          console.log(err); // handle errors
        });
    } else if (!this.nationalId || !this.certOfIncome) {
      this.checkDocuments();
    } else {
      this.acceptTermsPopup();
    }
  }

  receiveDocuments(document: { url: string; file_name: string; file_type: string }) {
    if (document.file_type === 'ID') {
      this.nationalId = document.url;
    } else if (document.file_type === 'certificate_of_inco') {
      this.certOfIncome = document.url;
    } else {
      this.userTerms = document.url;
    }
  }
  checkDocuments() {
    if (!this.nationalId) {
      // to trigger on changes in upload doc component
      this.nationalId = ' ';
      this.nationalId = '';
    }
    if (!this.certOfIncome) {
      this.certOfIncome = ' ';
      this.certOfIncome = '';
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
