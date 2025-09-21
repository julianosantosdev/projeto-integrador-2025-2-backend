import { prismaInstance } from '../../Factories/factoryPrisma';

export async function VerifiyUserAndEmailExist(email?: string, username?: string, Userid?: string) {
    if (!username && !email) {
        return null;
    }
    console.log('email: ', email, ' username: ', username);
    const details = [];

    if (email) {
        const ExEmail = await prismaInstance.user.findUnique({
            where: { email },
            select: {
                id: true,
            },
        });
        if (Userid) {
            if (ExEmail && ExEmail.id !== Userid) details.push({ field: 'Email', message: 'E-mail já cadastrado' });
        } else {
            if (ExEmail) details.push({ field: 'Email', message: 'E-mail já cadastrado' });
        }
    }

    if (username) {
        const ExUsername = await prismaInstance.user.findUnique({
            where: { username },
            select: {
                id: true,
            },
        });
        if (Userid) {
            if (ExUsername && ExUsername.id !== Userid) details.push({ field: 'Username', message: 'Username já cadastrado' });
        } else {
            if (ExUsername) details.push({ field: 'Username', message: 'Username já cadastrado' });
        }
    }

    return details.length ? details : null;
}
