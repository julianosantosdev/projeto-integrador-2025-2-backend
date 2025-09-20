import { ErrorApp } from './ErrorApp';

export class ErrorBadRequest extends ErrorApp {
    constructor(msgText?: string, details?: unknown) {
        const message = msgText ?? 'Erro na estrutura dos dados';
        super(message, 400, details);
    }
}
