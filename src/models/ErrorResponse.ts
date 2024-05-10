class ErrorResponse extends Error {
  statusCode: number;
  success: boolean;
  constructor(statusCode: number, msg: string) {
    super(msg);
    this.statusCode = statusCode;
    this.success = statusCode < 400;
  }
}

export default ErrorResponse;
