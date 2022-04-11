export class MingoChanError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public constructor(statusCode: number, msg: string, isOperational = true, stack = '') {
    super(msg);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
