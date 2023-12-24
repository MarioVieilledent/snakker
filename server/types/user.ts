export interface User {
  _id?: string | any;
  nickname: string;
  email?: string;
  password?: string;
  token?: string; // Token provided by server
}
