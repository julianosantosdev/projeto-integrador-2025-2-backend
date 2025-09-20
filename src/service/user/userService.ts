import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../entity/UserEntity';
import { ErrorNotFound } from '../../errors/ErrorNotFound';
import { IServiceUser } from './IUserService';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { ErrorConflict } from '../../errors/ErrorConflict';
import { prismaInstance } from '../../Factories/feactoryPrisma';

class UserService implements IServiceUser {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaInstance;
    }

    async createUser(data: UserCreateDTO): Promise<UserResponseDTO> {
        const { emailExists, usernameExists } = await this.findByUserAndEmail(data.email, data.username);

        if (emailExists || usernameExists) {
            const details = [];
            if (emailExists) details.push({ field: 'Email', message: 'E=mail já cadastrado' });
            if (usernameExists) details.push({ field: 'username', message: 'Usuário já está em uso' });
            throw new ErrorConflict(details);
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const user = await this.repository.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPassword,
                username: data.username,
                profile_image_url: data.profileImage ?? null,
            },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                profile_image_url: true,
                premium: true,
                role: true,
                bio: true,
            },
        });

        return user;
    }

    public async findById(id: string): Promise<UserResponseDTO | null> {
        const user = await this.repository.user.findFirst({
            where: { id },
        });

        console.log(user);
        if (!user) {
            throw new ErrorNotFound('Usuário não cadastrado');
        }

        return {
            id: user.id,
            bio: user.bio,
            email: user.email,
            name: user.name,
            premium: user.premium,
            profile_image_url: user.profile_image_url,
            role: user.role,
            username: user.username,
        };
    }

    //

    async findByEmail(email: string): Promise<UserResponseDTO | null> {
        const user = await this.repository.user.findFirst({
            where: { email },
        });
        console.log(email);
        if (!user) {
            throw new ErrorNotFound('Email não cadastrado');
        }

        return {
            id: user.id,
            bio: user.bio,
            email: user.email,
            name: user.name,
            premium: user.premium,
            profile_image_url: user.profile_image_url,
            role: user.role,
            username: user.username,
        };
    }

    //

    async userUpdate(id: string, data: UserUpdateDTO): Promise<any> {
        const select = {
            id: true,
            username: !!data.username,
            name: !!data.name,
            email: !!data.email,
            password: !!data.password,
            profile_image_url: !!data.profile_image_url,
            premium: data.premium ?? !!data.premium,
        };

        if (data.password) {
            const hashPassword = await bcrypt.hash(data.password, 10);
            data.password = hashPassword;
        }

        const user = this.repository.user.update({
            where: { id },
            data,
            select,
        });

        return user;
    }

    async findByUserAndEmail(email: string, username: string): Promise<{ emailExists: boolean; usernameExists: boolean }> {
        const existEmail = await this.repository.user.findFirst({
            where: { email },
            select: { id: true },
        });

        const existUsername = await this.repository.user.findFirst({
            where: { username },
            select: { id: true },
        });

        const emailExists = !!existEmail;
        const usernameExists = !!existUsername;

        return { emailExists, usernameExists };
    }
}

export default new UserService();
