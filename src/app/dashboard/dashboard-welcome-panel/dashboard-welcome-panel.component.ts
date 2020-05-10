import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@avenews/agt-sdk';

@Component({
  selector: 'app-dashboard-welcome-panel',
  templateUrl: './dashboard-welcome-panel.component.html',
  styleUrls: ['./dashboard-welcome-panel.component.scss']
})
export class DashboardWelcomePanelComponent implements OnInit {
  currentUser: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];
  }
}
