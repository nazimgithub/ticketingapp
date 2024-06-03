import { ValidationError } from "express-validator";

interface CustomError {
  statusCode: number;
  serialErrors(): {
    message: string;
    field?: string;
  }[]
}

export class RequestValidatorError extends Error implements CustomError{
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    // only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidatorError.prototype); 
  }

  serializeErros(){
    return this.errors.map(err => {
      return { message: err.msg, field: err.msg }
    });
  }
}