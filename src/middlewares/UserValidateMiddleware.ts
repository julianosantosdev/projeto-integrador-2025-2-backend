import { NextFunction, Request, Response } from 'express';
import { ErrorBadRequest } from '../errors/ErrorBadRequest';
import { ValidationCreate, ValidationEmail, ValidationUpdate } from '../validation/user/UserSchemaValidation';
import { VerifiyUserAndEmailExist } from '../validation/user/VerifyUserAndEmail';
import { ErrorConflict } from '../errors/ErrorConflict';

class UserValidationMiddleware {
    constructor() {}

    async ValidationCreate(req: Request, res: Response, next: NextFunction) {
        console.log('Cheguei na validação');
        console.log(req.body);
        if (!req.body) {
            throw new ErrorBadRequest('Não foi passado o body de criação corretamente');
        }
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

    async ValidationUpdated(req: Request, res: Response, next: NextFunction) {
        if (!req.params?.id) {
            throw new ErrorBadRequest('Não foi passado ID');
        }

        const detailsSchema = ValidationUpdate(req.body);
        if (detailsSchema) {
            throw new ErrorBadRequest('Erro na validação dos dados', detailsSchema);
        }
        const { email, username } = req.body;
        const { id } = req.params;
        const detailsVerify = await VerifiyUserAndEmailExist(id, email, username);
        if (detailsVerify) {
            throw new ErrorConflict(detailsVerify);
        }

        next();
    }
}

export default new UserValidationMiddleware();
