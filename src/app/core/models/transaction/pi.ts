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
    gps_coordinates_delivery: number[];
    container_type: string;
    container_quantity: number;
    incoterms: string[]; 
    expected_receiving_date: Date;
    expected_delivering_date: Date; 
    price_per_unit: number;
    pricing_weight_unit: string; 
    total_price: number;
    pricing_details: string;
    currency: string; 
    remarks: string; 
    valid_until: Date; 
    date_created: Date;
    transaction_id: string;
    created_by: {
        _id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        contact_by: string[]
    };
    approved: boolean;
  }
  