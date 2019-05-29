import { ProductQuoteRequest } from '../quote-request/product-quoteRequest';
import { SellerQuoteRequest } from './seller-quoteRequest';

export class QuoteRequest {
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
  sellers: SellerQuoteRequest[];
  currency: String;
  buyer_comments: String;
  valid_by: string;
  draft: Boolean;
  products: ProductQuoteRequest[];
  document_weight_unit: String;
  total_packages: Number;
  total_weight: Number;
  quotations: {
    amount: Number;
    best_offer: Number;
  };
  status: String;
  date_created: string;
}
