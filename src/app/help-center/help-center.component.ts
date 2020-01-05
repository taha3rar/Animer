import { Component, OnInit } from '@angular/core';
import { Intercom } from 'ng-intercom';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  constructor(private intercom: Intercom) {}

  ngOnInit() {}

  openIntercom(): void {
    this.intercom.show();
  }
}
