import { Request, Response, NextFunction } from "express";
import { RequestValidatorError } from '../errors/request-validator-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if(err instanceof RequestValidatorError) {
    return res.status(err.statusCode).send({ errors: err.serializeErros() });
  }

  if(err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong'}]
  });
};