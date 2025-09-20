import { ErrorApp } from './ErrorApp';

export class ErrorBadRequest extends ErrorApp {
    constructor(details: unknown, msgText?: string) {
        const message = msgText ?? 'Erro na estrutura dos dados';
        super(message, 400, details);
    }
}
