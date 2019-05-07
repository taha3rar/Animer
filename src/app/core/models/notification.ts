export class Notification {
  _id: string;
  read: boolean;
  date_created: Date;
  type: String;
  emitter: {
    _id: String;
    first_name: String;
    last_name: String;
    profile_picture: String;
    email: String;
  };
  receiver: {
    _id: String;
    first_name: String;
    last_name: String;
    profile_picture: String;
    email: String;
  };
  object_id: string;
}
