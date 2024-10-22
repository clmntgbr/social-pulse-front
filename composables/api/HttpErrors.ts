export class HttpErrors extends Error {
  public statusCode: number;
  public statusText: string;

  constructor(message: string, statusCode: number, statusText: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.name = "MyHttpError";
  }
}

export class HttpNotFoundError extends HttpErrors {
  constructor(
    message: string,
    statusCode = 404,
    statusText = "HttpNotFoundError"
  ) {
    super(message, statusCode, statusText);
    this.name = "HttpNotFoundError";
  }
}

export class HttpError extends HttpErrors {
  constructor(message: string, statusCode = 400, statusText = "HttpError") {
    super(message, statusCode, statusText);
    this.name = "HttpError";
  }
}

export class HttpInternalServerError extends HttpErrors {
  constructor(
    message: string,
    statusCode = 500,
    statusText = "HttpInternalServerError"
  ) {
    super(message, statusCode, statusText);
    this.name = "HttpInternalServerError";
  }
}
