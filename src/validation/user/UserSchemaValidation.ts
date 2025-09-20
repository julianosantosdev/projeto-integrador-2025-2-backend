import { ErrorBadRequest } from '../../errors/ErrorBadRequest';
import { ErrorConflict } from '../../errors/ErrorConflict';
import { UserSchemaCreate, UserSchemaEmail } from '../../schemas/User/SchemaUserCreate';

export function ValidationCreate(data: undefined) {
    console.log('Validandno schema');
    const valid = UserSchemaCreate.safeParse(data);

    if (!valid.success) {
        const details = valid.error.flatten().fieldErrors;
        return details;
    } else {
        return null;
    }
}

export function ValidationEmail(email: string) {
    const valid = UserSchemaEmail.safeParse(email);

    if (!valid.success) {
        const details = valid.error.flatten().fieldErrors;
        return details;
    } else {
        return null;
    }
}
