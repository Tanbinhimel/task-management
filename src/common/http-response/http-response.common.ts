export class HttpResponse {
  constructor(
    private statusCode: number = 200,
    private message: string = '',
    private error: string = '',
  ) {}

  get response(): httpResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      ...(this.error && { error: this.error }),
    };
  }
}

export interface httpResponse {
  statusCode: number;
  message: string;
  error?: string;
}
