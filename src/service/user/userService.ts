import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../entity/UserEntity';
import { ErrorNotFound } from '../../errors/ErrorNotFound';
import { IServiceUser } from './IUserService';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { ErrorConflict } from '../../errors/ErrorConflict';
import { prismaInstance } from '../../Factories/factoryPrisma';

class UserService implements IServiceUser {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaInstance;
    }

    //

    async createUser(data: UserCreateDTO): Promise<UserResponseDTO> {
        console.log('Cheguei no service');
        const hashPassword = await bcrypt.hash(data.password, 10);
        console.log('Senha hash', hashPassword);

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

    //

    public async findById(id: string): Promise<UserResponseDTO | null> {
        const user = await this.repository.user.findFirst({
            where: { id },
            select: {
                id: true,
                bio: true,
                email: true,
                name: true,
                premium: true,
                profile_image_url: true,
                role: true,
                username: true,
            },
        });

        if (!user) {
            throw new ErrorNotFound('Usuário não cadastrado');
        }

        return user;
    }

    //

    async findByEmail(email: string): Promise<UserResponseDTO | null> {
        const user = await this.repository.user.findFirst({
            where: { email },
            select: {
                id: true,
                bio: true,
                email: true,
                name: true,
                premium: true,
                profile_image_url: true,
                role: true,
                username: true,
            },
        });

        if (!user) {
            throw new ErrorNotFound('Email não cadastrado');
        }

        return user;
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
}

export default new UserService();
