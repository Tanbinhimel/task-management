export class HttpResponse {
  constructor(
    private statusCode: number = 200,
    private message: string = '',
    private response: object = null,
    private error: string = '',
  ) {}

  get result(): httpResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      ...(this.response && { response: this.response }),
      ...(this.error && { error: this.error }),
    };
  }
}

export interface httpResponse {
  statusCode: number;
  message: string;
  response?: object;
  error?: string;
}
