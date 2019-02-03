import { QuoteRequest } from './quote-request/quote-request';

export class ProformaInvoice {
  _id: string;
  produce: string;
  variety: string;
  stock_keeping_unit: string;
  certifications: string[];
  specification: string;
  tolerance: string;
  type_of_package: string;
  package_weight: string;
  package_weight_unit: string;
  quantity: number;
  total_weight: number;
  point_of_loading: string;
  gps_coordinates_loading: string[];
  point_of_delivery: string;
  gps_coordinates_delivery: string[];
  container_type: string;
  container_quantity: number;
  incoterms: string;
  expected_receiving_date: string;
  expected_delivering_date: string;
  price_per_unit: number;
  pricing_weight_unit: string;
  total_price: number;
  pricing_details: string;
  currency: string;
  remarks: string;
  valid_until: string;
  transaction_id: string;

  constructor(quoteRequest: QuoteRequest = new QuoteRequest()) {
    this.produce = quoteRequest.produce;
    this.variety = quoteRequest.variety;
    this.certifications = [];
    this.specification = quoteRequest.specification;
    this.container_type = quoteRequest.container_type;
    this.container_quantity = quoteRequest.container_quantity;
    this.type_of_package = quoteRequest.type_of_package;
    this.package_weight = quoteRequest.package_weight;
    this.package_weight_unit = quoteRequest.weight_unit;
    this.quantity = quoteRequest.quantity;
    this.total_weight = quoteRequest.total_weight;
    this.point_of_delivery = quoteRequest.point_of_delivery;
    this.gps_coordinates_delivery = []; // quoteRequest.gps_coordinates;
    this.gps_coordinates_loading = [];
    this.incoterms = quoteRequest.incoterms;
    this.pricing_weight_unit = quoteRequest.weight_unit;
    this.transaction_id = quoteRequest.transaction_id;
    this.expected_receiving_date = quoteRequest.receive_date;
  }
}
