import { Product } from '../order/product';
import { Invoice } from './invoice';

export class ProductInvoice {
  _id: string;
  numericId: string;
  product_type: string;
  produce: string;
  variety: string;
  type_of_package: string;
  package_weight: number;
  weight_unit: string;
  weight_details: boolean;
  total_weight: number;
  item_package_type: string;
  item_measurement_amount: string;
  item_measurement_unit: string;
  items_per_package: number;
  total_amount_items: number;
  package_price: number;
  price_per_unit: number;
  quantity: number;
  product_subtotal: number;
  individual_details: boolean;
  price_details: boolean;
  out_of_inventory: boolean;
  to_inventory: boolean;
  fromQuotation: true;
  currency: string; // Used to pass quotation currency to product when generating a PO from a quotation

  toProduct(invoice: Invoice): Product {
    const product = new Product();

    product.currency = invoice.currency;
    product.total_price = this.product_subtotal;
    product.product_type = this.product_type;
    product.produce = this.produce;
    product.variety = this.variety;
    product.type_of_package = this.type_of_package;
    product.package_weight = this.package_weight;
    product.weight_unit = this.weight_unit;
    product.total_weight = this.total_weight;
    product.item_package_type = this.item_package_type;
    product.item_measurement_amount = this.item_measurement_amount;
    product.item_measurement_unit = this.item_measurement_unit;
    product.items_per_package = this.items_per_package;
    product.total_amount_items = this.total_amount_items;
    product.package_price = this.package_price;
    product.price_per_unit = this.price_per_unit;
    product.quantity = this.quantity;

    return product;
  }
}
