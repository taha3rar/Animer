import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
declare var $: any;
import { StepperService } from '@app/core/stepper.service';
import { Contact } from '@avenews/agt-sdk';
import { CreateGoodsReceivedNoteDTO, GoodsReceivedNoteProduct } from '@avenews/agt-sdk/lib/types/goods-receive-note';

@Component({
  selector: 'app-grn-first-step',
  templateUrl: './grn-first-step.component.html',
  styleUrls: ['./grn-first-step.component.scss']
})
export class GrnFirstStepComponent implements OnInit {
  @Input() contacts: Contact[];
  contact: Contact;
  changed = false;
  @Input() grn: CreateGoodsReceivedNoteDTO;
  selectedContact: Contact;
  constructor(private stepperService: StepperService) {}
  ngOnInit() {
    this.stepperService.stepperInit();
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
    if (localStorage.getItem('grnContact')) {
      this.selectedContact = JSON.parse(localStorage.getItem('grnContact'));
    }
  }
  change(e: Contact) {
    if (e) {
      this.selectedContact = e;
      this.changed = true;
    }
  }
  newContact(e: Contact) {
    this.selectedContact = e;
    this.contacts.push(e);
    localStorage.setItem('grnContact', JSON.stringify(e));
    location.reload();
  }
  compare(c1: any, c2: any): boolean {
    if (localStorage.getItem('grnContact') && !this.changed) {
      return c1.numericId === JSON.parse(localStorage.getItem('grnContact')).numericId;
    } else {
      return c1 === 'Select supplier';
    }
  }
  addProduct(e: GoodsReceivedNoteProduct) {
    this.grn.products.push(e);
  }
}
