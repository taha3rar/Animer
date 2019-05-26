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
  sellers: [
    {
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
    }
  ];
  currency: String;
  buyer_comments: String;
  valid_by: Date;
  draft: Boolean;
  products: [
    {
      product_type: String;
      specification: String;
      produce: String;
      variety: String;
      type_of_package: String;
      package_weight: Number;
      weight_unit: String;
      total_weight: Number;
      item_package_type: String;
      item_measurement_amount: Number;
      item_measurement_unit: String;
      items_per_package: String;
      total_amount_items: Number;
      product_subtotal: Number;
      quantity: Number;
      out_of_inventory: Boolean;
      has_package_details: Boolean;
    }
  ];
  document_weight_unit: String;
  total_packages: Number;
  total_weight: Number;
  quotations: {
    amount: Number;
    best_offer: Number;
  };
  status: String;
  date_created: Date;
}
