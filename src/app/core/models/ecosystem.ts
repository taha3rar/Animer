export class Ecosystem {
  participants: [
    {
      _id: string;
      first_name: string;
      numericId: string;
      last_name: string;
      email: string;
    }
  ];
  owner_role: string;
  created_by: [
    {
      _id: string;
      numericId: string;
      first_name: string;
      last_name: string;
      email: string;
    }
  ];
  _id: string;
  name: string;
  description: string;
  type: string;
  date_created: string;
  numericId: number;
}
