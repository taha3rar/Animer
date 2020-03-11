import { DpoDocuments } from './dpo-documents';

export class DpoInformation {
  country: String;
  city: String;
  address: String;
  company_name: String;
  trade_name: String;
  registration_number: String;
  company_email: String;
  website: String;
  phone_number: String;
  documents: DpoDocuments[];
}
