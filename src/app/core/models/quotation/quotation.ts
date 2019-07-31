import { ProductQuotation } from './product-quotation';

export class Quotation {
  _id: string;
  numericId: Number;
  buyer: {
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    phone_number: String;
    contact_by: [String];
    company_name: string;
    address: String;
    city: String;
    zipcode: String;
    country: String;
    numericId: Number;
  };
  seller: {
    _id: String;
    first_name: string;
    last_name: string;
    email: String;
    phone_number: String;
    contact_by: [String];
    company_name: string;
    address: String;
    city: String;
    zipcode: String;
    country: String;
    numericId: Number;
  };
  currency: string;
  buyer_comments: String;
  seller_comments: String;
  quote_request: {
    _id: String;
  };
  valid_by: Date;
  draft: Boolean;
  product: ProductQuotation;
  status: string;
  date_created: Date;
  total_price: Number;
}
