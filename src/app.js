import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import userRouter from './router/userRouter';
import authRouter from './router/authRouter';

import './passport';
import { authenticateJwt } from './middlewares';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(routes.auth, authRouter);
app.use(routes.home, userRouter);

export default app;
