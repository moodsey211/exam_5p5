import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public detail: any;

  constructor(message: string, code: string, statusCode: number, detail: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = code;
    this.detail = detail;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err?.statusCode || 500;
  err.status = err?.status || 'error';

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    requestId: (req as any).id,
  });

  console.log(process.env['NODE_ENV']);

  if (process.env['NODE_ENV'] === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
        detail: {
          ...err.detail,
          stack: err.stack,
        },
      }
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
      }
    });
  }
};