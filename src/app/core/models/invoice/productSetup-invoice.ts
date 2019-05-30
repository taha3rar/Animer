// This class is specifically used to handle information of an invoice product in the invoice generator
// It is used to push data from the main invoice generator to the agricultural/processed product generator

import { ProductInvoice } from './product-invoice';

export class ProductSetupInvoice {
  productList: ProductInvoice[];
  index: string;
  currency: string;
}
