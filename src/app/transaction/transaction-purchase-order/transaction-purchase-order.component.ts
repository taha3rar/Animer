import { Component, Input, OnInit } from '@angular/core';
import { BaseTransaction } from '../base-transaction';
import { AuthenticationService, PurchaseOrderService, ProformaInvoiceService } from '@app/core';
import { PurchaseOrder } from '@app/core/models/transaction/purchase-order';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PurchaseOrderSpecificFields } from '../transaction/transaction-buyer/transaction-buyer.component';

@Component({
  selector: 'app-transaction-po',
  templateUrl: './transaction-purchase-order.component.html',
  styleUrls: ['./transaction-purchase-order.component.scss']
})
export class TransactionPurchaseOrderComponent extends BaseTransaction implements OnInit {
  poForm: FormGroup;
  purchaseOrder = new PurchaseOrder();
  proformaInvoice = new ProformaInvoice();
  @Input()
  completedPO = false;
  @Input()
  purchaseOrderSpecificFields: PurchaseOrderSpecificFields;

  constructor(
    protected authService: AuthenticationService,
    private purchaseOrderService: PurchaseOrderService,
    private proformaInvoiceService: ProformaInvoiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(authService);

    if (!this.completedPO) {
      this.poForm = this.formBuilder.group({
        payment_terms: ['', Validators.required],
        terms_conditions: [''],
        valid_until: ['', Validators.required]
      });
    }
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.transaction.proforma_invoice_id) {
      this.proformaInvoiceService.get(this.transaction.proforma_invoice_id).subscribe(proformaInvoice => {
        this.proformaInvoice = proformaInvoice;

        if (this.transaction.purchase_order_id) {
          this.purchaseOrderService.get(this.transaction.purchase_order_id).subscribe(purchaseOrder => {
            this.purchaseOrder = purchaseOrder;
          });
        } else {
          this.purchaseOrder = new PurchaseOrder(proformaInvoice);
        }
      });
    }
  }

  get pof() {
    return this.poForm.controls;
  }

  completed() {
    this.purchaseOrderSpecificFields.payment_terms = this.pof.payment_terms.value;
    this.purchaseOrderSpecificFields.terms_conditions = this.pof.terms_conditions.value;
    this.purchaseOrderSpecificFields.valid_until = moment(this.pof.valid_until.value).toJSON();

    this.completedPO = true;
  }

  submit() {
    this.purchaseOrder.payment_terms = this.purchaseOrderSpecificFields.payment_terms;
    this.purchaseOrder.terms_conditions = this.purchaseOrderSpecificFields.terms_conditions;
    this.purchaseOrder.valid_until = this.purchaseOrderSpecificFields.valid_until;

    this.purchaseOrderService.create(this.purchaseOrder).subscribe(() => {
      this.router.navigateByUrl('/transaction/list');
    });
  }
}
