import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/models/user/user';
import { ActivatedRoute } from '@angular/router';

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
