import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-inventory',
  templateUrl: './invoice-inventory.component.html',
  styleUrls: ['./invoice-inventory.component.scss']
})
export class InvoiceInventoryComponent implements OnInit {
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit() {}

  addProduct() {
    console.log(this.form);
    this.form.value.products.push({
      sarasa: true
    });
  }
}
