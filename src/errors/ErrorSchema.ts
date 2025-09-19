import { ErrorApp } from './ErrorApp';

export class ErrorSchema extends ErrorApp {
    constructor(message: string, details: unknown) {
        super(message, 422, details);
    }
}
