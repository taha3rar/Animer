import { ProductQuotation } from './product-quotation';

export class Quotation {
  _id: String;
  numericId: Number;
  buyer: {
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    phone_number: String;
    contact_by: [String];
    company_name: String;
    address: String;
    city: String;
    zipcode: String;
    country: String;
    numericId: Number;
  };
  seller: {
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    phone_number: String;
    contact_by: [String];
    company_name: String;
    address: String;
    city: String;
    zipcode: String;
    country: String;
    numericId: Number;
  };
  currency: String;
  seller_comments: String;
  due_date: Date;
  draft: Boolean;
  products: ProductQuotation[];
  status: String;
  date_created: Date;
  total_price: Number;
}
