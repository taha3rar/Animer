import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-ecosystem-profile',
  templateUrl: './ecosystem-profile.component.html',
  styleUrls: ['./ecosystem-profile.component.scss']
})
export class EcosystemProfileComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
