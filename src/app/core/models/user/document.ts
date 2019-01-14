export class UserDocument {
  uploaded_by: [
    {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
    }
  ];
  file: string;
  file_name: string;
  date_created: string;
  url: string;
  client_id: string;
}
