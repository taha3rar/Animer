import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // resetLinkStatus indicates the status of the reset link button
  // 0   -->  not clicked
  // 1   -->  reset link successfully sent
  // 2   -->  reset link failed to send
  resetLinkStatus = 0;

  constructor(private location: Location) {}

  ngOnInit() {}
}
