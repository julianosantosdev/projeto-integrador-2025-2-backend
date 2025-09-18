import { UserCreateDTO, UserResponseDTO } from '../../entity/UserEntity';

export interface IServiceUser {
    createUser(data: UserCreateDTO): Promise<UserResponseDTO>;
    findById(id: string): Promise<UserResponseDTO | null>;
    findByEmail(email: string): Promise<UserResponseDTO | null>;
}
