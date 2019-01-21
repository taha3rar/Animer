import { ActivatedRoute } from '@angular/router';
import { ProformaInvoice } from '@app/core/models/transaction/pi';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { AuthenticationService } from '@app/core';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';

@Component({
  selector: 'app-transaction-proforma-invoice',
  templateUrl: './transaction-proforma-invoice.component.html',
  styleUrls: ['./transaction-proforma-invoice.component.scss']
})
export class TransactionProformaInvoiceComponent implements OnInit {
  @Input()
  proformaInvoice = new ProformaInvoice();
  quoteRequest: QuoteRequest = new QuoteRequest();
  transaction: Transaction = new Transaction();
  isSeller = false;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
    const currentUserId = this.authService.currentUserId;
    // Populate variables
    this.proformaInvoice = this.route.snapshot.data['proformaInvoice'];
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.transaction = this.route.snapshot.data['transaction'];

    // Check if this is a seller
    if (currentUserId === this.transaction.seller_id) {
      this.isSeller = true;
    }
    // Populate empty pi for seller
    if (!this.proformaInvoice && this.isSeller) {
      this.populateProformaInvoice();
    }
  }
  populateProformaInvoice() {
    this.proformaInvoice = {
      _id: '',
      produce: this.quoteRequest.produce,
      variety: this.quoteRequest.variety,
      stock_keeping_unit: '',
      certifications: [],
      specification: this.quoteRequest.specification,
      tolerance: '',
      // Packing
      container_type: this.quoteRequest.container_type,
      container_quantity: this.quoteRequest.container_quantity,
      type_of_package: this.quoteRequest.type_of_package,
      package_weight: this.quoteRequest.package_weight,
      package_weight_unit: this.quoteRequest.weight_unit,
      quantity: this.quoteRequest.quantity,
      total_weight: this.quoteRequest.total_weight,
      // Shipping
      point_of_delivery: this.quoteRequest.point_of_delivery,
      gps_coordinates_delivery: this.quoteRequest.gps_coordinates,
      point_of_loading: '',
      gps_coordinates_loading: Array[2],
      incoterms: this.quoteRequest.incoterms.toString(),
      // Pricing
      pricing_weight_unit: this.quoteRequest.weight_unit,
      price_per_unit: null,
      currency: 'USD',
      total_price: null,
      pricing_details: '',
      // Additional
      expected_receiving_date: new Date(),
      expected_delivering_date: new Date(),
      remarks: '',
      valid_until: new Date(),
      transaction_id: this.quoteRequest.transaction_id
    };
  }
}
