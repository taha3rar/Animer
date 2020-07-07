import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
})
export class CaptchaComponent implements OnInit {
  @Output() resolved = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit() {}
  checked(e: any) {
    if (e) {
      this.resolved.emit(true);
    }
  }
}
