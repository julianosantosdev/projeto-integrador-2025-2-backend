import { UpdateUserDTO, UserCreateDTO, UserResponseDTO } from '../../entity/UserEntity';
import { ErrorNotFound } from '../../errors/ErrorNotFound';
import { IServiceUser } from './IUserService';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { ErrorConflict } from '../../errors/ErrorConflict';

class UserService implements IServiceUser {
    private repository: PrismaClient;

    constructor() {
        this.repository = new PrismaClient();
    }

    async createUser(data: UserCreateDTO): Promise<UserResponseDTO> {
        const { emailExists, usernameExists } = await this.findByUserAndEmail(data.email, data.username);

        if (emailExists || usernameExists) {
            const details = [];
            if (emailExists) details.push({ field: 'Email', message: 'E=mail já cadastrado' });
            if (usernameExists) details.push({ field: 'username', message: 'Usuário já está em uso' });
            throw new ErrorConflict('Falha na validação', details);
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

    async findByUserAndEmail(
        email: string,
        username: string,
    ): Promise<{ emailExists: boolean; usernameExists: boolean }> {
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

    async updateUser(data: UpdateUserDTO, id: string): Promise<any> {
        const user = await this.repository.user.findUnique({ where: { id } });
        if (!user) throw new ErrorNotFound('Usuário não encontrado');

        if (data.email && data.email != user.email) {
            const emailExist = await this.repository.user.findUnique({
                where: { email: data.email },
            });
            if (emailExist) throw new ErrorConflict('Email já está em uso');
        }
        if (data.username && data.username != user.username) {
            const userExist = await this.repository.user.findUnique({
                where: { username: data.username },
            });
            if (userExist) throw new ErrorConflict('Username já existe');
        }

        const passwrod_hash = data.password ? await bcrypt.hash(data.password, 10) : undefined;

        const prismaData: UpdateUserDTO = {
            email: data.email,
            name: data.name,
            username: data.username,
            profile_image_url: data.profile_image_url,
            premium: data.premium,
            password: passwrod_hash,
        };

        const arrayupdate = Object.entries(prismaData).map((chave) => {
            return { [chave]: newObjeto[chave] };
        });

        const updated = await this.repository.user.update({
            where: { id },
            data: prismaData,
            select: {
                bio: true,
                email: true,
                name: true,
                profile_image_url: true,
                username: true,
            },
        });

        return updated;
    }
}

export default new UserService();
