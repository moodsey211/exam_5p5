import { Request, Response } from 'express';
import { AppError } from '../../middleware/errorHandler';

export default function (req: Request, res: Response) {
  throw new AppError('page not found', 'not-found', 404, {
    path: req.originalUrl,
  });
};