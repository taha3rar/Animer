import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { EcosystemService } from '@app/core/api/ecosystem.service';
import { Ecosystem } from '@app/core/models/ecosystem';
import { User } from '@app/core/models/user/user';
import { StepperService } from '@app/core/stepper.service';

@Component({
  selector: 'app-ecosystem-generator',
  templateUrl: './ecosystem-generator.component.html',
  styleUrls: ['./ecosystem-generator.component.scss']
})
export class EcosystemGeneratorComponent extends BaseValidationComponent implements OnInit {
  newEcosystemForm: FormGroup;
  newEcosystem: Ecosystem;
  userClients: Client[];
  user: User;
  clientsAdded: any;
  page: 1;
  @ViewChild('closeModal')
  closeModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ecosystemService: EcosystemService,
    private stepperService: StepperService
  ) {
    super();
  }

  ngOnInit() {
    this.stepperService.stepperInit();
    this.clientsAdded = [];
    this.newEcosystem = new Ecosystem();
    this.userClients = this.route.snapshot.data['userClients'];
    this.user = this.route.snapshot.data['user'];
    this.newEcosystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      ecosystemType: ['', Validators.required],
      description: ['']
    });
    this.formInput = this.newEcosystemForm;
  }

  get ecosystemf() {
    return this.newEcosystemForm.controls;
  }

  toggleAddClient(client: any) {
    const idx = this.clientsAdded.indexOf(client);
    if (idx > -1) {
      this.clientsAdded.splice(idx, 1);
    } else {
      this.clientsAdded.push(client);
    }
    this.newEcosystem.participants = this.clientsAdded;
  }

  existClient(client: any) {
    return this.clientsAdded.indexOf(client) > -1;
  }

  submitEcosystem() {
    this.newEcosystem.name = this.ecosystemf.name.value;
    this.newEcosystem.type = this.ecosystemf.ecosystemType.value;
    this.newEcosystem.description = this.ecosystemf.description.value;
    this.ecosystemService.create(this.newEcosystem).subscribe(data => {
      this.closeModal.nativeElement.click();
      this.router.navigate([this.router.url]);
    });
  }
}
