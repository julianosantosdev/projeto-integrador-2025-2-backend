import { Request, Response } from 'express';
import { IServiceUser } from '../service/user/IUserService';
import { UserResponseDTO } from '../entity/UserEntity';
import { ErrorNotFound } from '../errors/ErrorNotFound';
import { ErrorBadRequest } from '../errors/ErrorBadRequest';

class UserController {
    constructor(private service: IServiceUser) {}

    userCreate = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        const { username, name, email, password, premium } = req.body;
        const file = req.file;

        const profile_image_url = file ? `localhost:3000/perfil-image/${file.filename}` : null;
        console.log('filename: ', file?.filename);

        const newUser = await this.service.createUser({
            email,
            name,
            password,
            username,
            premium,
            profileImage: profile_image_url,
        });

        return res.status(201).json(newUser);
    };

    //

    findById = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        const { id } = req.params;

        if (!id) {
            throw new ErrorNotFound('ID não foi passado por parâmetro corretamente');
        }

        const user = await this.service.findById(id);
        return res.status(200).json(user);
    };

    //

    findbyEmail = async (req: Request, res: Response): Promise<Response> => {
        if (!req.params?.email) {
            throw new ErrorBadRequest();
        }
        const { email } = req.params;
        const user = await this.service.findByEmail(email);

        return res.status(200).json(user);
    };

    //

    userUpdate = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        if (!id) {
            throw new ErrorBadRequest('Faltando passar o parâmetro do id');
        }
        console.log('cheguei no controller');
        const file = req.file;
        if (file) {
            req.body.profile_image_url = `localhost:3000/perfil-image/${file.filename}`;
        }

        const userUpdate = await this.service.userUpdate(id, req.body);
        return res.status(200).json(userUpdate);
    };

    //
}

export { UserController };
