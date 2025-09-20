import { Request, Response } from 'express';
import { IServiceUser } from '../service/user/IUserService';
import { UserResponseDTO } from '../entity/UserEntity';
import { ErrorNotFound } from '../errors/ErrorNotFound';
import { ErrorBadRequest } from '../errors/ErrorBadRequest';
import { UserSchemaCreate } from '../schemas/User/SchemaUserCreate';

class UserController {
    constructor(private service: IServiceUser) {}

    userCreate = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        const { username, name, email, password, profile_image_url, premium } = req.body;

        const isValid = UserSchemaCreate.safeParse(req.body);

        if (!isValid.success) {
            const details = isValid.error.flatten().fieldErrors;
            throw new ErrorBadRequest(details);
        }

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

    findById = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        const { id } = req.params;

        if (!id) {
            throw new ErrorNotFound('ID não foi passado por parâmetro corretamente');
        }

        const user = await this.service.findById(id);
        return res.status(200).json(user);
    };

    findbyEmail = async (req: Request, res: Response): Promise<Response> => {
        const { email } = req.params;
        if (!email) {
            throw new ErrorNotFound('Email não foi passado corretamente');
        }

        const user = await this.service.findByEmail(email);

        return res.status(200).json(user);
    };

    userUpdate = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        if (!id) {
            throw new ErrorBadRequest('Faltando passar o parâmetro do id');
        }

        const userUpdate = this.service.userUpdate(id, req.body);

        return res.status(200).json(userUpdate);
    };
}

export { UserController };
