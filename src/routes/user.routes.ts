import { Router } from 'express';
import { UserController } from '../controllers/userController';
import userService from '../service/user/userService';
import ValidateMiddleware from '../middlewares/UserValidateMiddleware';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

class UserRoutes {
    public routes = Router();
    private controller: UserController;
    private upload = multer(multerConfig);

    constructor() {
        const service = userService;
        this.controller = new UserController(service);
        this.userRoutes();
        console.log('ESTOU NA ROTA');
    }

    userRoutes() {
        this.routes.post('/', this.upload.single('file'), ValidateMiddleware.ValidationCreate, this.controller.userCreate);
        this.routes.get('/email/:email', ValidateMiddleware.ValidationFindByEmail, this.controller.findbyEmail);
        this.routes.put('/update/:id', this.upload.single('file'), ValidateMiddleware.ValidationUpdated, this.controller.userUpdate);
        this.routes.get('/:id', this.controller.findById);
    }
}

export default new UserRoutes().routes;
