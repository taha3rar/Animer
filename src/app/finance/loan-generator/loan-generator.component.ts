import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';

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
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan = form.value;
      }
    });
    this.stepperNavigation.currentActiveGeneralStep.subscribe(stepNumber => {
      this.currentGeneralActiveStep = stepNumber;
    });
    this.loan_form = this.formBuilder.group({
      // Qualification
      _id: undefined,
      qualification: this.formBuilder.group({
        amountNeeded: [undefined, Validators.required],
        loanPurpose: [undefined, Validators.required],
        agribusinessType: [this.formBuilder.array([], Validators.required)],
        businessType: [undefined, Validators.required],
        otherAgribusinessType: [undefined],
        incorporationSeniority: [undefined, Validators.required],
        registrationCountry: [undefined, Validators.required],
        absaBankAccount: [undefined, Validators.required],
        qualificationDone: false
      }),
      // STEP 1
      // Loan Details
      loanDetails: this.formBuilder.group({
        amountRequested: undefined,
        repaymentsNumber: 27,
        insureWithAbsa: [undefined]
      }),
      // Loan Goals
      loanGoals: this.formBuilder.group({
        loanFor: [undefined],
        shortTerm: [undefined],
        longTerm: [undefined]
      }),
      // STEP 2
      // Business Basic Details
      businessBasicDetails: this.formBuilder.group({
        businessName: undefined,
        businessNature: undefined,
        registrationDate: undefined,
        registrationNumber: undefined,
        pinNumber: undefined,
        vatNumber: undefined,
        physicalAddress: undefined,
        street: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
        companyWebsite: undefined
      }),
      // Business Location
      businessLocation: this.formBuilder.group({
        country: undefined,
        town: undefined,
        address: undefined,
        blockNumber: undefined,
        buildingName: undefined,
        postalCode: undefined,
        poBox: undefined
      }),
      // Business Premises
      businessPremises: this.formBuilder.group({
        premises: undefined
      }),
      // Business Other Details
      businessOtherDetails: this.formBuilder.group({
        yearsOfExperience: 0,
        contactPerson: undefined,
        numberOfPeopleWorking: 0
      }),
      // Business Financial Details
      businessFinancialDetails: this.formBuilder.group({
        activityFrom: undefined,
        activityUntil: undefined,
        businessSales: undefined,
        stocksHeld: undefined,
        costGoods: undefined,
        tradeDebtorsOutstanding: undefined,
        operatingExpenses: undefined,
        tradeCreditorsOutstanding: undefined,
        otherCosts: undefined,
        otherDebts: undefined,
        netProfit: undefined,
        paidUpCapital: undefined
      }),
      // Business Directors Details
      businessDirectorsDetails: this.formBuilder.group({
        fullName: undefined,
        idNumber: undefined,
        role: [this.formBuilder.array([], Validators.required)],
        pinNumber: undefined,
        shareholding: undefined,
        loanGuarantor: undefined,
        postalAddress: undefined,
        postalCode: undefined
      }),
      // STEP 3
      applicantDetails: this.formBuilder.group({
        fullName: undefined,
        otherNames: undefined,
        gender: undefined,
        maritalStatus: undefined,
        kenyanResident: undefined,
        birthDate: undefined,
        pinNumber: undefined,
        residenceCountry: undefined,
        nationality: undefined,
        nationalIdNumber: undefined,
        passportNumber: undefined,
        postalBox: undefined,
        postalCode: undefined,
        telephone: undefined,
        mobilePhone: undefined,
        email: [undefined, Validators.email]
      }),
      // STEP 4
      businessKeyPerson: this.formBuilder.group({
        fullName: undefined,
        otherNames: undefined,
        gender: undefined,
        maritalStatus: undefined,
        kenyanResident: undefined,
        birthDate: undefined,
        pinNumber: undefined,
        residenceCountry: undefined,
        nationality: undefined,
        nationalIdNumber: undefined,
        passportNumber: undefined,
        postalBox: undefined,
        postalCode: undefined,
        country: undefined,
        telephone: undefined,
        mobilePhone: undefined,
        email: [undefined, Validators.email],
        designation: undefined,
        durationInBusiness: undefined,
        qualification: undefined
      }),
      // biz key person location
      businessKeyPersonLocation: this.formBuilder.group({
        country: undefined,
        address: undefined,
        houseNumber: undefined,
        currentAddressDuration: undefined,
        postalBox: undefined
      }),
      // STEP 5
      absaBankingDetails: this.formBuilder.group({
        bankName: 'absa',
        bankBranch: undefined,
        accountNumber: undefined,
        accountOpeningDate: undefined,
        otherAbsaFacility: undefined,
        otherFacility: this.formBuilder.group({
          bankBranch: undefined,
          natureOfFacility: undefined,
          limitInitialGranted: undefined,
          monthlyRepayment: undefined,
          outstandingBalance: undefined
        })
      })
    });
    this.loanGeneratorDataService.setForm(this.loan_form);
    this.onChanges();
  }

  onChanges(): void {
    this.loan_form.valueChanges.subscribe(val => {
      this.loanGeneratorDataService.setForm(this.loan_form);
      console.log(this.loan_form.value);
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
