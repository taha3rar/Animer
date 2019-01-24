import { ProformaInvoice } from './proforma-invoice';

export class PurchaseOrder {
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
  quantity: Number;
  total_weight: Number;
  point_of_loading: string;
  gps_coordinates_loading: string[];
  point_of_delivery: string;
  gps_coordinates_delivery: string[];
  container_type: string;
  container_quantity: Number;
  incoterms: string;
  expected_receiving_date: string;
  expected_delivering_date: string;
  price_per_unit: Number;
  pricing_weight_unit: string;
  total_price: Number;
  pricing_details: string;
  currency: string;
  remarks: string;
  valid_until: string;
  carrier_company_name: string;
  carrier_company_phone_number: string;
  contact_person_full_name: string;
  contact_person_phone_number: string;
  truck_driver_full_name: string;
  truck_driver_phone_number: string;
  truck_model: string;
  trailer_type: string;
  truck_plate_number: string;
  estimated_time_of_loading: Date;
  payment_terms: string;
  terms_conditions: string;
  estimated_time_of_delivery: Date;
  total_cost_of_shipment: Number;
  transaction_id: string;
  buyer_date_of_acceptence: Date;
  seller_date_of_acceptence: Date;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    contact_by: string[];
  };
  date_created: Date;
  approved: boolean;

  constructor(proformaInvoice: ProformaInvoice = new ProformaInvoice()) {
    this.produce = proformaInvoice.produce;
    this.variety = proformaInvoice.variety;
    this.stock_keeping_unit = proformaInvoice.stock_keeping_unit;
    this.certifications = proformaInvoice.certifications;
    this.specification = proformaInvoice.specification;
    this.tolerance = proformaInvoice.tolerance;
    this.type_of_package = proformaInvoice.type_of_package;
    this.package_weight = proformaInvoice.package_weight;
    this.package_weight_unit = proformaInvoice.package_weight_unit;
    this.quantity = proformaInvoice.quantity;
    this.total_weight = proformaInvoice.total_weight;
    this.point_of_loading = proformaInvoice.point_of_loading;
    this.gps_coordinates_loading = proformaInvoice.gps_coordinates_loading;
    this.point_of_delivery = proformaInvoice.point_of_delivery;
    this.gps_coordinates_delivery = proformaInvoice.gps_coordinates_delivery;
    this.container_type = proformaInvoice.container_type;
    this.container_quantity = proformaInvoice.container_quantity;
    this.incoterms = proformaInvoice.incoterms;
    this.expected_receiving_date = proformaInvoice.expected_receiving_date;
    this.expected_delivering_date = proformaInvoice.expected_delivering_date;
    this.price_per_unit = proformaInvoice.price_per_unit;
    this.pricing_weight_unit = proformaInvoice.pricing_weight_unit;
    this.total_price = proformaInvoice.total_price;
    this.pricing_details = proformaInvoice.pricing_details;
    this.currency = proformaInvoice.currency;
    this.transaction_id = proformaInvoice.transaction_id;
  }
}
