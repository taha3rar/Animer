export class ProductInvoice {
  _id: string;
  numericId: string;
  product_type: string;
  produce: string;
  variety: string;
  type_of_package: string;
  package_weight: number;
  weight_unit: number;
  weight_details: boolean;
  total_weight: number;
  item_package_type: string;
  item_measurement_amount: number;
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
}
