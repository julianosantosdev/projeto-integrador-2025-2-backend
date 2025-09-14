import express, { Express } from 'express';
import RoutesMain from './routes/routesMain';

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlerwares();
        this.routes();
    }

    middlerwares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(RoutesMain);
    }
}

export default new App().app;
