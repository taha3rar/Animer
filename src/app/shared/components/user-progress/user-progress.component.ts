import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { User } from '@avenews/agt-sdk';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit, AfterContentChecked {
  @Input() userProgress = {};
  @Input() currentUser: User;
  @Input() currentComponent: string;
  @Output() completedProgress: EventEmitter<Boolean> = new EventEmitter();
  calculatedUserProgress = 0;

  constructor() {}

  ngOnInit() {
    this.calculateUserProgress();
  }

  ngAfterContentChecked() {
    this.calculateUserProgress();
  }

  calculateUserProgress() {
    const totalSteps = 3;
    const stepsArr = Object.keys(this.userProgress).map(i => this.userProgress[i]);
    const noOfCompleted = stepsArr.filter(Boolean).length;

    this.calculatedUserProgress = Math.round((noOfCompleted / totalSteps) * 100);
  }
}
