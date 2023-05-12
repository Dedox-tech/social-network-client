interface Response {
  code: number;
  message: string;
  errors: any[];
}

export interface EmptyResponse extends Response {
  data: null;
}

export interface DataResponse<T> extends Response {
  data: T;
}
