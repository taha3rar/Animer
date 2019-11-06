import { User } from '@app/core/models/user/user';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {
  @Input() userProgress = {};
  @Input() currentUser: User;
  @Input() currentComponent: string;
  calculatedUserProgress = 0;

  constructor() {}

  ngOnInit() {
    this.calculateUserProgress();
  }

  calculateUserProgress() {
    let totalSteps = 0;
    const stepsArr = Object.keys(this.userProgress).map(i => this.userProgress[i]);
    const noOfCompleted = stepsArr.filter(Boolean).length;

    if (
      (this.currentUser.roles[0] === 'buyer' && !this.currentUser.referrer) ||
      (this.currentUser.referrer && this.currentUser.roles[0] === 'seller')
    ) {
      totalSteps = 3;
    } else if (this.currentUser.roles[0] === 'seller') {
      totalSteps = 4;
    } else if (this.currentUser.roles[0] === 'buyer' && this.currentUser.referrer) {
      totalSteps = 2;
    } else {
      totalSteps = 5;
    }
    this.calculatedUserProgress = Math.round((noOfCompleted / totalSteps) * 100);
  }
}
