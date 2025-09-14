import { UserCreateDTO, UserResponseDTO } from '../../entity/UserEntity';
import { IServiceUser } from './IUserService';
import { PrismaClient } from '@prisma/client';

class UserService implements IServiceUser {
    private repository: PrismaClient;

    constructor() {
        this.repository = new PrismaClient();
    }

    createUser(data: UserCreateDTO): Promise<UserResponseDTO> {
        const user = this.repository.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
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
}

export default new UserService();
