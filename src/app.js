import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import userRouter from './router/userRouter';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(routes.home, userRouter);

export default app;
