import { ProductInvoice } from '../invoice/product-invoice';
import { User } from './user';
import { NumberValueAccessor } from '@angular/forms/src/directives';

export class Order {
  _id: string;
  numericId: string;
  // Buyer and Seller information
  buyer: User;
  seller: User;
  products: ProductInvoice[];
  vat: number;
  total_due: number;
  subtotal: number;
  currency: string;
  document_weight_unit: string;
  sign_by: {
    first_name: string;
    last_name: string;
    company_title: string;
    company_name: string;
    date: string;
  };
  deliver_to: {
    contact_name: string;
    address: string;
    city: string;
    zip_code: string;
    phone: string;
    expected_delivery_date: string;
  };
  invoice: {
    _id: string;
    draft: boolean;
    total_due: number;
  };
  order_comments: string;
  payment_comments: string;
  date_created: string;
  valid_until: string;
  status: string;
  draft: boolean;
  total_packages: number;
  total_weight: number;
}
