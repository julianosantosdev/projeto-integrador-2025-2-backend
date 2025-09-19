import { ErrorApp } from './ErrorApp';

export class ErrorConflict extends ErrorApp {
    constructor(message: string, details: unknown) {
        super(message, 409, details);
    }
}
