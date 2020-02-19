import { AuthenticationService } from '@app/core';
import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-qualifcation-tool',
  templateUrl: './qualifcation-tool.component.html',
  styleUrls: ['./qualifcation-tool.component.scss']
})
export class QualifcationToolComponent implements OnInit {
  userFirstName: string;
  currentIndex = 1;
  checkboxCounter = 0;
  otherOption = false;
  @Output() beginApplication: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.userFirstName = this.authenticationService.credentials.user.personal_information.first_name;
  }

  onNextQuestion() {
    this.currentIndex += 1;
  }

  onPrevQuestion() {
    this.currentIndex -= 1;
  }

  onFinishQualification() {
    this.beginApplication.emit(true);
  }

  onCheck(event: any) {
    if (event.target.checked && this.checkboxCounter < 3) {
      this.checkboxCounter += 1;
    } else if (!event.target.checked) {
      this.checkboxCounter -= 1;
    } else {
      event.target.checked = false;
    }
  }

  openTextField() {
    this.otherOption = true;
  }

  displayTab(index: number): boolean {
    return this.currentIndex === index;
  }
}
