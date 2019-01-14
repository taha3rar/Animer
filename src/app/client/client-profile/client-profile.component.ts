import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core/models/user/user';
import { Counter } from '../client/client.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  @Input()
  user: User;
  @Input()
  counter: Counter;

  constructor() {}

  ngOnInit() {}
}
