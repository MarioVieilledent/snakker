export interface User {
  id?: string;
  nickname: string;
  password?: string;
  token?: string; // Token provided by server
}
