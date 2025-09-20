import { prismaInstance } from '../../Factories/factoryPrisma';

export async function VerifiyUserAndEmailExist(Userid: string, email?: string, username?: string) {
    if (!username && !email) {
        return null;
    }

    const details = [];

    if (email) {
        const ExEmail = await prismaInstance.user.findUnique({
            where: { email },
            select: {
                id: true,
            },
        });

        if (ExEmail && ExEmail.id !== Userid) details.push({ field: 'Email', message: 'E-mail já cadastrado' });
    }

    if (username) {
        const ExUsername = await prismaInstance.user.findUnique({
            where: { username },
            select: {
                id: true,
            },
        });
        console.log(Userid, 'ExEmail - ', ExUsername?.id);
        if (ExUsername && ExUsername.id !== Userid) details.push({ field: 'Username', message: 'Usuário já cadastrado' });
    }

    return details.length ? details : null;
}
