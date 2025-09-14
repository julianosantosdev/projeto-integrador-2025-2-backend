import { Router } from 'express';
import userRoutes from './user.routes';

class RoutesMain {
    public routes = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use('/users', userRoutes);
    }
}

export default new RoutesMain().routes;
