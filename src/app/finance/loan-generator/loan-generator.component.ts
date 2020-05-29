import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { CreateLoanDTO, Loan } from '@avenews/agt-sdk';
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
  saved_loan: Loan;
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
        this.saved_loan = loan;
        console.log(this.saved_loan);
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
      _id: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan._id,
      numericId: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.numericId,
      dateCreated: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.dateCreated,
      status: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.status,
      qualification: this.formBuilder.group({
        amountNeeded: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.amountNeeded,
          Validators.required
        ],
        loanPurpose: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.loanPurpose,
          Validators.required
        ],
        agribusinessType:
          this.formBuilder.array([], Validators.required) || this.saved_loan.qualification.agribusinessType,
        businessType: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.businessType,
          Validators.required
        ],
        otherAgribusinessType: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.otherAgribusinessType
        ],
        incorporationSeniority: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.incorporationSeniority,
          Validators.required
        ],
        registrationCountry: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.registrationCountry,
          Validators.required
        ],
        absaBankAccount: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.qualification.absaBankAccount,
          Validators.required
        ],
        qualificationDone: Object.is(this.saved_loan, undefined)
          ? false
          : this.saved_loan.qualification.qualificationDone
      }),
      // STEP 1
      // Loan Details
      loanDetails: this.formBuilder.group({
        amountRequested: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.loanDetails.amountRequested,
        repaymentsNumber: Object.is(this.saved_loan, undefined) ? 27 : this.saved_loan.loanDetails.repaymentsNumber,
        insureWithAbsa: [Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.loanDetails.insureWithAbsa]
      }),
      // Loan Goals
      loanGoals: this.formBuilder.group({
        loanFor: [Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.loanGoals.loanFor],
        shortTerm: [Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.loanGoals.shortTerm],
        longTerm: [Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.loanGoals.longTerm]
      }),
      // STEP 2
      // Business Basic Details
      businessBasicDetails: this.formBuilder.group({
        businessName: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.businessName,
        businessNature: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.businessNature,
        registrationDate: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.registrationDate,
        registrationNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.registrationNumber,
        pinNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessBasicDetails.pinNumber,
        vatNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessBasicDetails.vatNumber,
        physicalAddress: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.physicalAddress,
        street: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessBasicDetails.street,
        phoneNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.phoneNumber,
        emailAddress: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.emailAddress,
        companyWebsite: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessBasicDetails.companyWebsite
      }),
      // Business Location
      businessLocation: this.formBuilder.group({
        country: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.country,
        town: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.town,
        address: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.address,
        blockNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.blockNumber,
        buildingName: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.buildingName,
        postalCode: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.postalCode,
        poBox: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessLocation.poBox
      }),
      // Business Premises
      businessPremises: this.formBuilder.group({
        premises: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessPremises.premises
      }),
      // Business Other Details
      businessOtherDetails: this.formBuilder.group({
        yearsOfExperience: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessOtherDetails.yearsOfExperience,
        contactPerson: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessOtherDetails.contactPerson,
        numberOfPeopleWorking: Object.is(this.saved_loan, undefined)
          ? 0
          : this.saved_loan.businessOtherDetails.numberOfPeopleWorking
      }),
      // Business Financial Details
      businessFinancialDetails: this.formBuilder.group({
        activityFrom: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.activityFrom,
        activityUntil: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.activityUntil,
        businessSales: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.businessSales,
        stocksHeld: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.stocksHeld,
        costGoods: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.costGoods,
        tradeDebtorsOutstanding: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.tradeDebtorsOutstanding,
        operatingExpenses: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.operatingExpenses,
        tradeCreditorsOutstanding: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.tradeCreditorsOutstanding,
        otherCosts: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.otherCosts,
        otherDebts: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.otherDebts,
        netProfit: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.netProfit,
        paidUpCapital: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessFinancialDetails.paidUpCapital
      }),
      // Business Directors Details
      businessDirectorsDetails: this.formBuilder.group({
        fullName: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessDirectorsDetails.fullName,
        idNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessDirectorsDetails.idNumber,
        roles: this.formBuilder.array([] || this.saved_loan.businessDirectorsDetails.roles, Validators.required),
        pinNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessDirectorsDetails.pinNumber,
        shareholding: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessDirectorsDetails.shareholding,
        loanGuarantor: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessDirectorsDetails.loanGuarantor,
        postalAddress: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessDirectorsDetails.postalAddress,
        postalCode: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessDirectorsDetails.postalCode
      }),
      // STEP 3
      applicantDetails: this.formBuilder.group({
        fullName: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.fullName,
        otherNames: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.otherNames,
        gender: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.gender,
        maritalStatus: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.applicantDetails.maritalStatus,
        kenyanResident: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.applicantDetails.kenyanResident,
        birthDate: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.birthDate,
        pinNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.pinNumber,
        residenceCountry: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.applicantDetails.residenceCountry,
        nationality: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.nationality,
        nationalIdNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.applicantDetails.nationalIdNumber,
        passportNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.applicantDetails.passportNumber,
        postalBox: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.postalBox,
        postalCode: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.postalCode,
        telephone: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.telephone,
        mobilePhone: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.mobilePhone,
        email: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.applicantDetails.email,
          Validators.email
        ]
      }),
      // STEP 4
      businessKeyPerson: this.formBuilder.group({
        fullName: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.fullName,
        otherNames: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.otherNames,
        gender: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.gender,
        maritalStatus: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.maritalStatus,
        kenyanResident: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.kenyanResident,
        birthDate: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.birthDate,
        pinNumber: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.pinNumber,
        residenceCountry: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.residenceCountry,
        nationality: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.nationality,
        nationalIdNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.nationalIdNumber,
        passportNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.passportNumber,
        postalBox: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.postalBox,
        postalCode: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.postalCode,
        country: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.country,
        telephone: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.telephone,
        mobilePhone: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.mobilePhone,
        email: [
          Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.email,
          Validators.email
        ],
        designation: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPerson.designation,
        durationInBusiness: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.durationInBusiness,
        qualification: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPerson.qualification
      }),
      // biz key person location
      businessKeyPersonLocation: this.formBuilder.group({
        country: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPersonLocation.country,
        address: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.businessKeyPersonLocation.address,
        houseNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPersonLocation.houseNumber,
        currentAddressDuration: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPersonLocation.currentAddressDuration,
        postalBox: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.businessKeyPersonLocation.postalBox
      }),
      // STEP 5
      absaBankingDetails: this.formBuilder.group({
        branch: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.absaBankingDetails.branch,
        accountNumber: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.absaBankingDetails.accountNumber,
        createdOn: Object.is(this.saved_loan, undefined) ? undefined : this.saved_loan.absaBankingDetails.createdOn,
        otherAbsaFacility: Object.is(this.saved_loan, undefined)
          ? undefined
          : this.saved_loan.absaBankingDetails.otherAbsaFacility,
        otherFacility: this.formBuilder.group({
          bankBranch: Object.is(this.saved_loan, undefined)
            ? undefined
            : this.saved_loan.absaBankingDetails.otherFacility.bankBranch,
          natureOfFacility: Object.is(this.saved_loan, undefined)
            ? undefined
            : this.saved_loan.absaBankingDetails.otherFacility.natureOfFacility,
          limitInitialGranted: Object.is(this.saved_loan, undefined)
            ? undefined
            : this.saved_loan.absaBankingDetails.otherFacility.limitInitialGranted,
          monthlyRepayment: Object.is(this.saved_loan, undefined)
            ? undefined
            : this.saved_loan.absaBankingDetails.otherFacility.monthlyRepayment,
          outstandingBalance: Object.is(this.saved_loan, undefined)
            ? undefined
            : this.saved_loan.absaBankingDetails.otherFacility.outstandingBalance
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
