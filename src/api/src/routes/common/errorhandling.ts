import { Request, Response, NextFunction } from 'express';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    const details = {
        success: false,
        error: {
            code: 'internal-server-error',
            message: 'Internal server error',
        }
    };

    if (process.env.NODE_ENV === 'development') {
        details.error.detail = err.message;
    }

    console.error(err.stack);
    res.status(500).json(details);
};