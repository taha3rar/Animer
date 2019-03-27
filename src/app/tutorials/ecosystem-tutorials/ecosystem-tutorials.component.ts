import { Component, OnInit } from '@angular/core';
import { TutorialControlComponent } from '@app/shared/components/tutorial-control/tutorial-control.component';

@Component({
  selector: 'app-ecosystem-tutorials',
  templateUrl: './ecosystem-tutorials.component.html'
})
export class EcosystemTutorialsComponent extends TutorialControlComponent implements OnInit {
  numberOfSlides = 2;

  constructor() {
    super();
  }

  ngOnInit() {}
}
