import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@app/core/models/order/user';
import { FormGroup, AbstractControl } from '@angular/forms';

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
  @Input()
  openDocument: Boolean;
  @Output()
  updateSeller = new EventEmitter<User>();
  newUser: User = new User();

  constructor() {}

  ngOnInit() {}

  sellerUpdate(): void {
    this.updateSeller.emit(this.newUser);
  }
}
