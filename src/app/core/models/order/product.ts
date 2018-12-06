export class Product {
  _id: string;
  product_type: string;
  produce: string;
  variety: string;
  type_of_package: string;
  package_weight: number;
  weight_unit: string;
  total_weight: number;
  item_package_type: string;
  item_measurement_amount: number;
  item_measurement_unit: string;
  items_per_package: string;
  total_amount_items: number;
  package_price: number;
  price_per_unit: number;
  product_subtotal: number;
  quantity: number;
  numericId: string;
  out_of_inventory: boolean;
  buyer_set_price: boolean;
  individual_details: boolean;
  price_details: boolean;
  weight_details: boolean;
  has_package_details: boolean;
}
