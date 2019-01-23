import { Component, Input, OnInit } from '@angular/core';
import { BaseTransaction } from '../base-transaction';
import { AuthenticationService, PurchaseOrderService, ProformaInvoiceService } from '@app/core';
import { PurchaseOrder } from '@app/core/models/transaction/purchase-order';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';

@Component({
  selector: 'app-transaction-po',
  templateUrl: './transaction-purchase-order.component.html',
  styleUrls: ['./transaction-purchase-order.component.scss']
})
export class TransactionPurchaseOrderComponent extends BaseTransaction implements OnInit {
  tour: any;

  @Input()
  completedPO = false;

  purchaseOrder = new PurchaseOrder();
  proformaInvoice = new ProformaInvoice();

  constructor(
    protected authService: AuthenticationService,
    private purchaseOrderService: PurchaseOrderService,
    private proformaInvoiceService: ProformaInvoiceService
  ) {
    super(authService);
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
}
