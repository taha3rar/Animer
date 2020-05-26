import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-generator-list',
  templateUrl: './loan-generator.component.html',
  styleUrls: ['./loan-generator.component.scss']
})
export class LoanGeneratorComponent implements OnInit, OnDestroy {
  loan_form: FormGroup;
  @ViewChild('generalSteps') generalSteps: ElementRef<HTMLElement>;
  @Input() beginApplication = false;
  currentGeneralActiveStep: number;
  loan: CreateLoanDTO;
  previewDisplayed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private stepperNavigation: StepperNavigationService,
    private loanGeneratorDataService: LoanGeneratorDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan = form.value;
      }
    });
    this.route.data.subscribe(({ loan }) => {
      if (loan) {
        this.loan = loan;
        // this.stepperNavigation.manuallySetStep(this.loan.currentStep.generalStepNumber);
        this.beginApplication = true;
      }
      this.initializeGenerator();
    });
  }

  initializeGenerator() {
    this.stepperNavigation.currentActiveGeneralStep.subscribe(stepNumber => {
      this.currentGeneralActiveStep = stepNumber;
    });
    this.loan_form = this.formBuilder.group({
      // Qualification
      _id: Object.is(this.loan, undefined) ? undefined : this.loan._id,
      qualification: this.formBuilder.group({
        amountNeeded: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.amountNeeded,
          Validators.required
        ],
        loanPurpose: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.loanPurpose,
          Validators.required
        ],
        agribusinessType: this.formBuilder.array([], Validators.required) || this.loan.qualification.agribusinessType,
        businessType: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.businessType,
          Validators.required
        ],
        otherAgribusinessType: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.otherAgribusinessType
        ],
        incorporationSeniority: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.incorporationSeniority,
          Validators.required
        ],
        registrationCountry: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.registrationCountry,
          Validators.required
        ],
        absaBankAccount: [
          Object.is(this.loan, undefined) ? undefined : this.loan.qualification.absaBankAccount,
          Validators.required
        ],
        qualificationDone: Object.is(this.loan, undefined) ? false : this.loan.qualification.qualificationDone
      }),
      // STEP 1
      // Loan Details
      loanDetails: this.formBuilder.group({
        amountRequested: Object.is(this.loan, undefined) ? undefined : this.loan.loanDetails.amountRequested,
        repaymentsNumber: Object.is(this.loan, undefined) ? 27 : this.loan.loanDetails.repaymentsNumber,
        insureWithAbsa: [Object.is(this.loan, undefined) ? undefined : this.loan.loanDetails.insureWithAbsa]
      }),
      // Loan Goals
      loanGoals: this.formBuilder.group({
        loanFor: [Object.is(this.loan, undefined) ? undefined : this.loan.loanGoals.loanFor],
        shortTerm: [Object.is(this.loan, undefined) ? undefined : this.loan.loanGoals.shortTerm],
        longTerm: [Object.is(this.loan, undefined) ? undefined : this.loan.loanGoals.longTerm]
      }),
      // STEP 2
      // Business Basic Details
      businessBasicDetails: this.formBuilder.group({
        businessName: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.businessName,
        businessNature: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.businessNature,
        registrationDate: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.registrationDate,
        registrationNumber: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessBasicDetails.registrationNumber,
        pinNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.pinNumber,
        vatNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.vatNumber,
        physicalAddress: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.physicalAddress,
        street: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.street,
        phoneNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.phoneNumber,
        emailAddress: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.emailAddress,
        companyWebsite: Object.is(this.loan, undefined) ? undefined : this.loan.businessBasicDetails.companyWebsite
      }),
      // Business Location
      businessLocation: this.formBuilder.group({
        country: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.country,
        town: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.town,
        address: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.address,
        blockNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.blockNumber,
        buildingName: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.buildingName,
        postalCode: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.postalCode,
        poBox: Object.is(this.loan, undefined) ? undefined : this.loan.businessLocation.poBox
      }),
      // Business Premises
      businessPremises: this.formBuilder.group({
        premises: Object.is(this.loan, undefined) ? undefined : this.loan.businessPremises.premises
      }),
      // Business Other Details
      businessOtherDetails: this.formBuilder.group({
        yearsOfExperience: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessOtherDetails.yearsOfExperience,
        contactPerson: Object.is(this.loan, undefined) ? undefined : this.loan.businessOtherDetails.contactPerson,
        numberOfPeopleWorking: Object.is(this.loan, undefined)
          ? 0
          : this.loan.businessOtherDetails.numberOfPeopleWorking
      }),
      // Business Financial Details
      businessFinancialDetails: this.formBuilder.group({
        activityFrom: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.activityFrom,
        activityUntil: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.activityUntil,
        businessSales: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.businessSales,
        stocksHeld: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.stocksHeld,
        costGoods: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.costGoods,
        tradeDebtorsOutstanding: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessFinancialDetails.tradeDebtorsOutstanding,
        operatingExpenses: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessFinancialDetails.operatingExpenses,
        tradeCreditorsOutstanding: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessFinancialDetails.tradeCreditorsOutstanding,
        otherCosts: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.otherCosts,
        otherDebts: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.otherDebts,
        netProfit: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.netProfit,
        paidUpCapital: Object.is(this.loan, undefined) ? undefined : this.loan.businessFinancialDetails.paidUpCapital
      }),
      // Business Directors Details
      businessDirectorsDetails: this.formBuilder.group({
        fullName: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.fullName,
        idNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.idNumber,
        roles: this.formBuilder.array([] || this.loan.businessDirectorsDetails.roles, Validators.required),
        pinNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.pinNumber,
        shareholding: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.shareholding,
        loanGuarantor: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.loanGuarantor,
        postalAddress: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.postalAddress,
        postalCode: Object.is(this.loan, undefined) ? undefined : this.loan.businessDirectorsDetails.postalCode
      }),
      // STEP 3
      applicantDetails: this.formBuilder.group({
        fullName: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.fullName,
        otherNames: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.otherNames,
        gender: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.gender,
        maritalStatus: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.maritalStatus,
        kenyanResident: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.kenyanResident,
        birthDate: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.birthDate,
        pinNumber: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.pinNumber,
        residenceCountry: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.residenceCountry,
        nationality: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.nationality,
        nationalIdNumber: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.nationalIdNumber,
        passportNumber: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.passportNumber,
        postalBox: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.postalBox,
        postalCode: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.postalCode,
        telephone: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.telephone,
        mobilePhone: Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.mobilePhone,
        email: [Object.is(this.loan, undefined) ? undefined : this.loan.applicantDetails.email, Validators.email]
      }),
      // STEP 4
      businessKeyPerson: this.formBuilder.group({
        fullName: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.fullName,
        otherNames: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.otherNames,
        gender: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.gender,
        maritalStatus: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.maritalStatus,
        kenyanResident: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.kenyanResident,
        birthDate: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.birthDate,
        pinNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.pinNumber,
        residenceCountry: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.residenceCountry,
        nationality: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.nationality,
        nationalIdNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.nationalIdNumber,
        passportNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.passportNumber,
        postalBox: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.postalBox,
        postalCode: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.postalCode,
        country: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.country,
        telephone: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.telephone,
        mobilePhone: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.mobilePhone,
        email: [Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.email, Validators.email],
        designation: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.designation,
        durationInBusiness: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessKeyPerson.durationInBusiness,
        qualification: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPerson.qualification
      }),
      // biz key person location
      businessKeyPersonLocation: this.formBuilder.group({
        country: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPersonLocation.country,
        address: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPersonLocation.address,
        houseNumber: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPersonLocation.houseNumber,
        currentAddressDuration: Object.is(this.loan, undefined)
          ? undefined
          : this.loan.businessKeyPersonLocation.currentAddressDuration,
        postalBox: Object.is(this.loan, undefined) ? undefined : this.loan.businessKeyPersonLocation.postalBox
      }),
      // STEP 5
      absaBankingDetails: this.formBuilder.group({
        branch: Object.is(this.loan, undefined) ? undefined : this.loan.absaBankingDetails.branch,
        accountNumber: Object.is(this.loan, undefined) ? undefined : this.loan.absaBankingDetails.accountNumber,
        createdOn: Object.is(this.loan, undefined) ? undefined : this.loan.absaBankingDetails.createdOn,
        otherAbsaFacility: Object.is(this.loan, undefined) ? undefined : this.loan.absaBankingDetails.otherAbsaFacility,
        otherFacility: this.formBuilder.group({
          bankBranch: Object.is(this.loan, undefined)
            ? undefined
            : this.loan.absaBankingDetails.otherFacility.bankBranch,
          natureOfFacility: Object.is(this.loan, undefined)
            ? undefined
            : this.loan.absaBankingDetails.otherFacility.natureOfFacility,
          limitInitialGranted: Object.is(this.loan, undefined)
            ? undefined
            : this.loan.absaBankingDetails.otherFacility.limitInitialGranted,
          monthlyRepayment: Object.is(this.loan, undefined)
            ? undefined
            : this.loan.absaBankingDetails.otherFacility.monthlyRepayment,
          outstandingBalance: Object.is(this.loan, undefined)
            ? undefined
            : this.loan.absaBankingDetails.otherFacility.outstandingBalance
        })
      })
    });
    this.loanGeneratorDataService.setForm(this.loan_form);
    this.onChanges();
  }

  onChanges(): void {
    this.loan_form.valueChanges.subscribe(val => {
      this.loanGeneratorDataService.setForm(this.loan_form);
    });
  }

  generateStepper() {
    this.stepperNavigation.setGeneralStepsNumber(this.generalSteps.nativeElement.children.length);
  }

  isQualificationDone() {
    return this.loan.qualification.qualificationDone;
  }

  isSoleTrader() {
    return this.loan.qualification.businessType === 'sole trader';
  }

  displayStepTab(stepNumber: number): boolean {
    return this.currentGeneralActiveStep >= stepNumber;
  }

  displayStepContent(stepNumber: number): boolean {
    return this.currentGeneralActiveStep === stepNumber;
  }

  setPreview(toBeDisplayed: boolean) {
    this.previewDisplayed = toBeDisplayed;
  }

  ngOnDestroy() {
    this.loanGeneratorDataService.flushForm();
    this.stepperNavigation.flushSteps();
  }
}
