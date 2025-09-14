import { Request, Response } from 'express';
import { IServiceUser } from '../service/user/IUserService';
import { UserResponseDTO } from '../entity/UserEntity';

class UserController {
    constructor(private service: IServiceUser) {}

    createUser = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        const { username, name, email, password, profile_image_url, premium } = req.body;

        console.log('Esotu no controller');

        const newUser = await this.service.createUser({
            email,
            name,
            password,
            premium,
            username,
            profileImage: profile_image_url ?? null,
        });

        return res.status(201).json(newUser);
    };
}

export { UserController };
