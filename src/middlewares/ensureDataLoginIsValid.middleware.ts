import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

const ensureDataIsValid = (schema: ZodType) => (request: Request, response: Response, next: NextFunction) => {
    const validateLoginData = schema.parse(request.body);
    request.body = validateLoginData;
    return next();
};

export { ensureDataIsValid };
