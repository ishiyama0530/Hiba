export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
