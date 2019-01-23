export class QuoteRequest {
  // Prdoct
  _id: string;
  numericID: string;
  date_created: Date;
  produce: string;
  variety: string;
  specification: string;
  // Packing
  container_type: string;
  container_quantity: number;
  type_of_package: string;
  package_weight: string;
  weight_unit: string;
  quantity: number;
  total_weight: number;
  packing_details: string;
  // Shipping
  local: boolean;
  international: boolean;
  incoterms: string;
  excluded_coutries: string[];
  point_of_delivery: string;
  gps_coordinates: number[];
  receive_date: string;
  // Additional
  remarks: string;
  valid_until: string;
  // Related to transaction
  transaction_id: string;
  transaction_type: string;
}
