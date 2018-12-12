import { Component, OnInit, Input } from '@angular/core';
import { Counter } from '../models/counter';

@Component({
  selector: 'app-dashboard-counter-panel',
  templateUrl: './dashboard-counter-panel.component.html',
  styleUrls: ['./dashboard-counter-panel.component.scss']
})
export class DashboardCounterPanelComponent implements OnInit {
  @Input()
  counter: Counter;

  constructor() {}

  ngOnInit() {}
}
