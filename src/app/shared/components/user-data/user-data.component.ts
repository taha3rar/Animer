import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core/models/order/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  @Input()
  issued_by: Boolean;
  @Input()
  issued_for: Boolean;
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}
}
