import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Contact } from '@avenews/agt-sdk';
import { GoodsReceivedNoteProduct } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grn-product-generator',
  templateUrl: './grn-product-generator.component.html',
  styleUrls: ['./grn-product-generator.component.scss']
})
export class GrnProductGeneratorComponent implements OnInit {
  selectedContact: Contact;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      currency: [undefined, Validators.required],
      description: [undefined],
      measurement: [undefined, Validators.required],
      name: [undefined, Validators.required],
      price: [undefined, Validators.required],
      quantity: [undefined, Validators.required],
      rate: [undefined, Validators.required]
    });
  }
}
