import { NextFunction, Request, Response } from 'express';
import { ErrorBadRequest } from '../errors/ErrorBadRequest';
import { ValidationCreate, ValidationEmail } from '../validation/user/UserSchemaValidation';
import { VerifiyUserAndEmailExist } from '../validation/user/VerifyUserAndEmail';
import { ErrorConflict } from '../errors/ErrorConflict';

class UserValidationMiddleware {
    constructor() {}

    async ValidationCreate(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            throw new ErrorBadRequest();
        }

        console.log('Cheguei na validação');

        const details = ValidationCreate(req.body);
        if (details) {
            throw new ErrorBadRequest('Erro na requisição', details);
        }

        const { email, username } = req.body;
        const detailsVerify = await VerifiyUserAndEmailExist(email, username);
        if (detailsVerify) {
            throw new ErrorConflict(detailsVerify);
        }

        next();
    }

    ValidationFindByEmail(req: Request, res: Response, next: NextFunction) {
        if (!req.params?.email) {
            throw new ErrorBadRequest();
        }
        const { email } = req.params;
        const detailsSchema = ValidationEmail(email);
        if (detailsSchema) {
            throw new ErrorBadRequest('Erro na estrutura do email');
        }

        next();
    }
}

export default new UserValidationMiddleware();
