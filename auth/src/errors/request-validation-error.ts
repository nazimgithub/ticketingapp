import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    throw new Error("Method not implemented.");
  }
  statusCode = 400;
  
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype); 
  }

  serializeErros(){
    return this.errors.map(err => {
      return { message: err.msg, field: err.msg }
    });
  }
}