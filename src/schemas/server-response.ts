export interface ServerBaseResponse<T> {
  code: number;
  message: string;
  data?: T;
}
