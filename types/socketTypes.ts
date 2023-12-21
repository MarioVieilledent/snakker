export interface SocketWrapper<T> {
  name: string; // Name of the socket used
  token: string; // Token to ensure user has right to perform requests
  date?: Date; // Date of creation of exchange
  data: T; // Data wrapped
}
