import { Request, Response, NextFunction } from "express";
import { NotAuthroziedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.currentUser) {
    throw new NotAuthroziedError();
  }

  next();
};