import { Component, OnInit } from '@angular/core';
import { Credentials } from '@app/core/models/user/login-models';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  credentials: Credentials;
  constructor() {}

  ngOnInit() {}
}
