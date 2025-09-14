import express, { Express } from 'express';
// import { loginRoutes } from './routes/login.route';
// import { userRoutes } from './routes/user.routes';

// const app: Application = express();
// app.use(express.json());

// app.use('/login', loginRoutes);
// app.use('/user', userRoutes);

// export { app };

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

    routes() {}
}

export default new App().app;
