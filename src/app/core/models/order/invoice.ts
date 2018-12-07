import { User } from './user';
import { Product } from './product';

export class Invoice {
  _id: string;
  buyer: User;
  seller: User;
  numericId: string;
  products: [Product];
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
    company_title: string;
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
  order_comments: string;
  order_id: string;
  personal_po_id: string;
  invoice_comment: string;
  payment_comments: string;
  date_created: string;
  valid_until: string;
  draft: boolean;
  total_packages: Number;
  total_weight: Number;
}
