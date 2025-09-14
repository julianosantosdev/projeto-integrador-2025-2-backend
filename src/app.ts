import express, { type Application } from 'express';
import { loginRoutes } from './routes/login.route';
import { userRoutes } from './routes/user.routes';

const app: Application = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

export { app };
