import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  changeDiv() {
    $('#p1').css({ display: 'none' });
    $('#p2').css({ display: 'block' });
  }

  onActiveBtn(btnType: string) {
    $('button').removeClass('active');
    $('#' + btnType).addClass('active');
  }

  onBack() {
    $('#p2').css({ display: 'none' });
    $('#p1').css({ display: 'block' });
  }
}
