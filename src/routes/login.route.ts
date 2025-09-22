import { Router } from 'express';
import { UserController } from '../controllers/userController';
import userService from '../service/user/userService';
import { LoginController } from '../controllers/login.controller';
import { LoginService } from '../service/login/login.service';
import { ensureDataIsValid } from '../middlewares/ensureDataLoginIsValid.middleware';
import { loginSchema } from '../schemas/login/login.schemas';

class LoginRoutes {
    public routes = Router();
    private controller: LoginController;

    constructor() {
        const service: LoginService = new LoginService();
        this.controller = new LoginController(service);
        this.loginRoutes();
    }

    loginRoutes() {
        this.routes.post('', ensureDataIsValid(loginSchema), this.controller.handleLogin);
    }
}

export default new LoginRoutes().routes;
