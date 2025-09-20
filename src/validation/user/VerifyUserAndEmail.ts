import { prismaInstance } from '../../Factories/factoryPrisma';

export async function VerifiyUserAndEmailExist(email: string, username: string) {
    const ExEmail = await prismaInstance.user.findUnique({
        where: { email },
        select: {
            id: true,
        },
    });

    const ExUsername = await prismaInstance.user.findUnique({
        where: { username },
        select: {
            id: true,
        },
    });

    if (ExEmail || ExUsername) {
        const details = [];
        if (ExEmail) details.push({ field: 'Email', message: 'E-mail já cadastrado' });
        if (ExUsername) details.push({ field: 'usernmae', message: 'Usuário já cadastrado' });
        return details;
    } else {
        return null;
    }
}
