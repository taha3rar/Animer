import { Component, OnInit } from '@angular/core';
import { TutorialControlComponent } from '@app/shared/components/tutorial-control/tutorial-control.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'app-invoice-tutorials',
  templateUrl: './invoice-tutorials.component.html'
})
export class InvoiceTutorialsComponent extends TutorialControlComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
