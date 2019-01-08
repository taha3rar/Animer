import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Client } from '@app/core/models/user/client';
import { UserService } from '@app/core/api/user.service';
import { EcosystemService } from '@app/core/api/ecosystem.service';
import { Ecosystem } from '@app/core/models/ecosystem';
import { del } from 'selenium-webdriver/http';

@Component({
  selector: 'app-ecosystem-generator',
  templateUrl: './ecosystem-generator.component.html',
  styleUrls: ['./ecosystem-generator.component.scss']
})
export class EcosystemGeneratorComponent implements OnInit {
  newEcosystemForm: FormGroup;
  newEcosystem: Ecosystem;
  userClients: Client[];
  clientsAdded: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private ecosystemService: EcosystemService
  ) {}

  ngOnInit() {
    this.clientsAdded = [];
    this.newEcosystem = new Ecosystem();
    this.userClients = this.route.snapshot.data['userClients'];
    this.newEcosystemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
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
    this.newEcosystem.description = this.ecosystemf.description.value;
    this.ecosystemService.create(this.newEcosystem).subscribe(data => {
      this.router.navigateByUrl('/ecosystems');
    });
  }
}
