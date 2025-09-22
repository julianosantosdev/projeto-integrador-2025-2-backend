import { Router } from 'express';
import userRoutes from './user.routes';
import loginRoute from './login.route';

class RoutesMain {
    public routes = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use('/users', userRoutes);
        this.routes.use('/login', loginRoute);
    }
}

export default new RoutesMain().routes;
