export class QuoteRequest {
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
    }
  ];
  currency: String;
  comments: String;
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
  quotations: [
    {
      _id: String;
      total_price: Number;
      user_id: String;
      date_created: Date;
      status: {
        buyer: String;
        seller: String;
      };
    }
  ];
  status: String;
}
