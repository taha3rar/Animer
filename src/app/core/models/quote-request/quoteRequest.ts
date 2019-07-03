import { ProductQuoteRequest } from '../quote-request/product-quoteRequest';
import { SellerQuoteRequest } from './seller-quoteRequest';

export class QuoteRequest {
  _id: string;
  numericId: number;
  buyer: {
    _id: String;
    numericId: string;
    first_name: string;
    last_name: string;
    email: String;
    phone_number: String;
    contact_by: [String];
    company_name: String;
    company_number: String;
    address: String;
    city: String;
    zipcode: String;
    country: String;
  };
  ecosystem_id: string;
  sellers: SellerQuoteRequest[];
  currency: String;
  buyer_comments: String;
  valid_by: string;
  draft: Boolean;
  product: ProductQuoteRequest;
  document_weight_unit: String;
  total_packages: Number;
  total_weight: number;
  quotations: {
    count: number;
    total_weight_accepted: number;
    quantity_accepted: number;
  };
  status: string;
  date_created: string;
}
