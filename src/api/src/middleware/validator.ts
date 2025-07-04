import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './errorHandler';

export function validate(validations: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(
        `Validation failed: ${errors.array().map((err: any) => err.msg).join(', ')}`,
        'validation-failed',
        400,
        {
          errors: errors.array(),
        }
      ));
    }
    next();
  };
}