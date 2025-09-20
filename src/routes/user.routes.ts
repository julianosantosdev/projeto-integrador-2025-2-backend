import { Router } from 'express';
import { UserController } from '../controllers/userController';
import userService from '../service/user/userService';
import ValidateMiddleware from '../middlewares/UserValidateMiddleware';

class UserRoutes {
    public routes = Router();
    private controller: UserController;

    constructor() {
        const service = userService;
        this.controller = new UserController(service);
        this.userRoutes();
    }

    userRoutes() {
        this.routes.post('/', ValidateMiddleware.ValidationCreate, this.controller.userCreate);

        this.routes.get('/email/:email', ValidateMiddleware.ValidationFindByEmail, this.controller.findbyEmail);
        this.routes.put('/update/:id', this.controller.userUpdate);

        this.routes.get('/:id', this.controller.findById);
    }
}

export default new UserRoutes().routes;
