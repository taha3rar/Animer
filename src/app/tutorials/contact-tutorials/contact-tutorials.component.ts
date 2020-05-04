import { Component, OnInit } from '@angular/core';
import { TutorialControlComponent } from '@app/shared/components/tutorial-control/tutorial-control.component';

@Component({
  selector: 'app-contact-tutorials',
  templateUrl: './contact-tutorials.component.html'
})
export class ContactTutorialsComponent extends TutorialControlComponent implements OnInit {
  numberOfSlides = 2;

  constructor() {
    super();
  }

  ngOnInit() {}
}
