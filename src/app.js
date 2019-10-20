import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import userRouter from './router/userRouter';
import { sequelize, User } from './models';
import authRouter from './router/authRouter';
import helloRouter from './router/helloRouter';

import './passport';
import { authenticateJwt } from './middlewares';

const app = express();

sequelize.sync();

User.create({
  email: 'kyujong93@naver.com',
  password: '123',
  name : 'kyu',
  age : 21
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(routes.auth, authRouter);
app.use(routes.home, userRouter);
app.use(routes.hello, helloRouter);

export default app;
