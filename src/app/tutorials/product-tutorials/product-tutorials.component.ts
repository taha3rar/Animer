import { TutorialControlComponent } from './../../shared/components/tutorial-control/tutorial-control.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-tutorials',
  templateUrl: './product-tutorials.component.html'
})
export class ProductTutorialsComponent extends TutorialControlComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
