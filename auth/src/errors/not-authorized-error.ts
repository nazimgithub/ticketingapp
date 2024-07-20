import { CustomError } from "./custom-error";

export class NotAuthroziedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthroziedError.prototype);
  }
  
  serializeErrors() { 
    return [{ message: 'Not authorized' }];
  }
}
