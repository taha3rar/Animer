import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  targetStep(step: string) {
    const tab = $('a[href="#' + step + '"]');
    $(tab).click();
  }
}
