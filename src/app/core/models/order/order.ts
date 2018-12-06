import { Product } from './product';
import { User } from './user';

export class Order {
  _id: string;
  numericId: string;
  // Buyer and Seller information
  buyer: User;
  seller: User;
  products: [Product];
  vat: number;
  total_due: number;
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
  invoice: {
    _id: string;
    draft: boolean;
  };
  order_comments: string;
  payment_comments: string;
  date_created: string;
  valid_until: string;
  draft: boolean;
  total_packages: Number;
  total_weight: Number;
}
