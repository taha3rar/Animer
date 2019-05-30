// This class is specifically used to handle information of a quoteRequest product in the quoteRequest generator
// It is used to push data from the main quoteRequest generator to the agricultural/processed product generator

import { ProductQuoteRequest } from './product-quoteRequest';

export class ProductSetupQuoteRequest {
  product: ProductQuoteRequest;
  index: Number;
}
