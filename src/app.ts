import express, { Express } from 'express';
import RoutesMain from './routes/routesMain';
import ErrosMiddleware from './middlewares/ErrosMiddleware';

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
    }

    private routes() {
        this.app.use(RoutesMain);
    }

    private errors() {
        this.app.use(ErrosMiddleware.errorsMiddleware);
    }
}

export default new App().app;
