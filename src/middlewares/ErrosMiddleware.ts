import { Response, Request, NextFunction } from 'express';
import { ErrorApp } from '../errors/ErrorApp';

class ErrorMiddleware {
    public errorsMiddleware(error: Request & ErrorApp, req: Request, res: Response, next: NextFunction) {
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : 'Internal Server Error';
        return res.status(statusCode).json({
            message: message,
            details: error.details,
        });
    }
}

export default new ErrorMiddleware();
