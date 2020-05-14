import { Component, OnInit } from '@angular/core';
import { Credentials } from '@avenews/agt-sdk';

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
