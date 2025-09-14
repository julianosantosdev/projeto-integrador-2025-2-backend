import app from './app';
import 'dotenv/config';
import prisma from './prisma/client';

const PORT = process.env.PORT || 3000;
const runningMsg: string = `App is listening on port ${PORT}`;

const runServer = async () => {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(runningMsg);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

runServer();
