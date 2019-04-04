import { Component, OnInit } from '@angular/core';
import { TutorialControlComponent } from '@app/shared/components/tutorial-control/tutorial-control.component';

@Component({
  selector: 'app-client-tutorials',
  templateUrl: './client-tutorials.component.html'
})
export class ClientTutorialsComponent extends TutorialControlComponent implements OnInit {
  numberOfSlides = 2;

  constructor() {
    super();
  }

  ngOnInit() {}
}
