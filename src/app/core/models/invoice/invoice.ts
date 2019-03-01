import { User } from '../order/user';
import { ProductInvoice } from './product-invoice';

export class Invoice {
  _id: string;
  buyer: User;
  seller: User;
  numericId: string;
  products: ProductInvoice[];
  vat_amount: number;
  vat_percentage: number;
  discount_amount: number;
  discount_percentage: number;
  total_due: number;
  subtotal: number;
  currency: string;
  document_weight_unit: string;
  sign_by: {
    first_name: string;
    last_name: string;
    company_name: string;
    date: string;
  };
  deliver_to: {
    contact_name: string;
    address: string;
    city: string;
    zip_code: string;
    phone_number: string;
    expected_delivery_date: string;
  };
  order_comments: string; // TODO: Check if it can be deleted
  order_id: string; // Used for single invoice
  personal_po_id: string;
  invoice_comment: string;
  payment_comments: string;
  date_created: string;
  valid_until: string;
  status: string;
  draft: boolean;
  total_packages: Number;
  total_weight: Number;

  constructor() {
    const date = Date.now();
    this.sign_by = {
      date: date.toString(),
      first_name: '',
      last_name: '',
      company_name: ''
    };

    this.deliver_to = {
      contact_name: '',
      address: '',
      city: '',
      zip_code: '',
      phone_number: '',
      expected_delivery_date: ''
    };

    this.buyer = new User();
    this.seller = new User();

    this.date_created = date.toString();
  }
}
