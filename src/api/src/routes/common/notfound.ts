import { Request } from 'express';
import { AppError } from '../../middleware/errorHandler';

export default function (req: Request) {
  throw new AppError('page not found', 'not-found', 404, {
    path: req.originalUrl,
  });
};