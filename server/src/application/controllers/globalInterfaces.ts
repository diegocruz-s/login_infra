export interface IHttpRequest<T> {
  body?: T
};

export interface IHttpResponse<T> {
  body: T;
  statusCode: number;
};