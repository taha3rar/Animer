export class Transaction {
  _id: String;
  numericId: String;
  chat_id: String;
  produce: String;
  variety: String;
  weight_unit: String;
  total_quantity: String;
  total_weight: String;
  transaction_type: String;
  status: String;
  seller_id: string;
  buyer_id: string;
  buyer: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  seller: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  quote_request_id: String;
  proforma_invoice_id: String;
  logistics_id: String;
  purchase_order_id: String;
  documents_id: [
    {
      _id: String;
      type: String;
      url: String;
    }
  ];
}
