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
  quote_request_id: string;
  proforma_invoice_id: string;
  logistics_id: string;
  purchase_order_id: string;
  documents_id: [
    {
      _id: string;
      type: string;
      url: string;
    }
  ];
}
