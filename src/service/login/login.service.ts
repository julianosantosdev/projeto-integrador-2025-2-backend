import { Request, Response } from 'express';
import { TLoginRequest } from '../../interfaces/login.interface';
import prisma from '../../prisma/client';
import { User } from '@prisma/client';
import { ErrorApp } from '../../errors/ErrorApp';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class LoginService {
    private token: string | undefined;

    async login(payloadLogin: TLoginRequest): Promise<string> {
        const user: User | null = await prisma.user.findFirst({ where: { email: payloadLogin.email } });

        if (!user) {
            throw new ErrorApp('Invalid credentials', 401);
        }

        const passwordValidate: boolean = await compare(payloadLogin.password, user.password);

        if (!passwordValidate) {
            throw new ErrorApp('Invalid credentials', 401);
        }

        this.token = sign(
            {
                userName: user.nickname,
                userId: user.id,
            },
            process.env.SECRET_KEY!,
            {
                expiresIn: '1h',
                subject: user.id.toString(),
            },
        );

        return this.getToken()!;
    }

    public getToken() {
        return this.token!;
    }
}
