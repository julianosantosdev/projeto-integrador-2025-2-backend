import { Router } from 'express';
import { UserController } from '../controllers/userController';
import userService from '../service/user/userService';

class UserRoutes {
    public routes = Router();
    private controller: UserController;

    constructor() {
        const service = userService;
        this.controller = new UserController(service);
        this.userRoutes();
    }

    userRoutes() {
        this.routes.post('/', this.controller.userCreate);
        this.routes.get('/:id', this.controller.findById);
        this.routes.get('/email/:email', this.controller.findbyEmail);
        this.routes.put('/update/:id', this.controller.userUpdate);
    }
}

export default new UserRoutes().routes;
