import { Router } from 'express';

class UserRoutes {
    public routes = Router();

    constructor() {
        this.userRoutes();
    }

    userRoutes() {}
}

export default new UserRoutes().routes;
