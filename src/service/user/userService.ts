import { UserCreateDTO, UserResponseDTO } from '../../entity/UserEntity';
import { IServiceUser } from './IUserService';
import { PrismaClient } from '@prisma/client';

class UserService implements IServiceUser {
    private repository: PrismaClient;

    constructor() {
        this.repository = new PrismaClient();
    }

    async createUser(data: UserCreateDTO): Promise<UserResponseDTO> {
        const user = await this.repository.user.create({
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

    public async findById(id: string): Promise<UserResponseDTO | null> {
        const user = await this.repository.user.findFirst({
            where: { id },
        });

        if (!user) {
            return null;
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
}

export default new UserService();
