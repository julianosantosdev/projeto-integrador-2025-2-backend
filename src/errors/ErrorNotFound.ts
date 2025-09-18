import { ErrorApp } from './ErrorApp';

export class ErrorNotFound extends ErrorApp {
    constructor(message: string) {
        super(message, 404);
    }
}
