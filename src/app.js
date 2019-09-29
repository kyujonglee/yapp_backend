import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import userRouter from './router/userRouter';
import cors from 'cors';
import { sequelize, User } from './models';
import authRouter from './router/authRouter';

import './passport';
import { authenticateJwt } from './passport';

const app = express();

sequelize.sync();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(routes.auth, authRouter);
app.use(routes.home, userRouter);

export default app;
