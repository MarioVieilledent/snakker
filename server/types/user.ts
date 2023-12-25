export interface User {
  _id?: string | any;
  username: string;
  email?: string;
  password?: string;
  token?: string; // Token provided by server
}
