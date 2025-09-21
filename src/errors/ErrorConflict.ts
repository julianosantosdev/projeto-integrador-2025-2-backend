import { ErrorApp } from './ErrorApp';

export class ErrorConflict extends ErrorApp {
    constructor(details: unknown, msgText?: string) {
        const message = msgText ?? 'Conflito de dados';
        super(message, 409, details);
    }
}

// Aqui a idéia é retornar quando receber valor que já estiver no banco.
// ou seja, valores únicos "Email já existe" etc..
