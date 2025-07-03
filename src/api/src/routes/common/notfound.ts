import { Request, Response } from 'express';

export default function (req: Request, res: Response) {
    res.status(404).json({
        success: false,
        error: {
          code: 'not-found',
          message: 'page not found',
          detail: {
            path: req.originalUrl,
          }
        }
    });
};