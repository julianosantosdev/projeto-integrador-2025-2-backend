import express, { Express } from 'express';
import RoutesMain from './routes/routesMain';
import ErrosMiddleware from './middlewares/ErrosMiddleware';
import { resolve } from 'path';

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlerwares();
        this.routes();
        this.errors();
    }

    private middlerwares() {
        this.app.use(express.json());
        this.app.use('/perfil-image', express.static(resolve(__dirname, '..', 'uploads')));
    }

    private routes() {
        this.app.use(RoutesMain);
    }

    private errors() {
        this.app.use(ErrosMiddleware.errorsMiddleware);
    }
}

export default new App().app;
