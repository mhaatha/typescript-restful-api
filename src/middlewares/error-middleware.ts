import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response-error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error: ${JSON.stringify(error)}`
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errrors: error.message
    });
  } else {
    res.status(500).json({
      errors: error.message
    });
  }
}