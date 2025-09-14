import { UserCreateDTO, UserResponseDTO } from '../../entity/UserEntity';

export interface IServiceUser {
    createUser(data: UserCreateDTO): Promise<UserResponseDTO>;
}
