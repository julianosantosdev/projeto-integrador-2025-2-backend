import { Request, Response } from 'express';
import { IServiceUser } from '../service/user/IUserService';
import { UserResponseDTO } from '../entity/UserEntity';
import bcrypt from 'bcryptjs';
import { UserSchemaCreate } from '../schemas/SchemaUserCreate';

class UserController {
    constructor(private service: IServiceUser) {}

    createUser = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        try {
            const { username, name, email, password, profile_image_url, premium } = req.body;

            const isValid = UserSchemaCreate.safeParse(req.body);

            if (!isValid.success) {
                return res.status(400).json({
                    message: 'Erro de validação',
                    errors: isValid.error.issues.map((i) => ({
                        field: i.path.join('.'),
                        message: i.message,
                    })),
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await this.service.createUser({
                email,
                name,
                password: hashPassword,
                premium,
                username,
                profileImage: profile_image_url ?? null,
            });

            return res.status(201).json(newUser);
        } catch {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    };

    findById = async (req: Request, res: Response): Promise<Response<UserResponseDTO>> => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "O parâmetro 'id' não foi passado" });
            }

            const user = await this.service.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    };
}

export { UserController };
