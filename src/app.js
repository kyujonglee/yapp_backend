import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import createError from 'http-errors';
import swaggerDefinition from './swagger';

import './passport';

import { authenticateJwt } from './middlewares';
import routes from './routes';
import globalRouter from './router/globalRouter';
import projectRouter from './router/projectRouter';
import mypageRouter from './router/mypageRouter';
import helloRouter from './router/helloRouter';
import userRouter from './router/userRouter';
import keywordRouter from './router/keywordRouter';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(passport.initialize());

app.use(routes.projects, projectRouter);
app.use(routes.mypage, mypageRouter);
app.use(routes.user, userRouter);
app.use(routes.home, globalRouter);
app.use(routes.keywords, keywordRouter);
app.use(routes.hello, helloRouter);

const swaggerOption = {
  swaggerDefinition,
  apis: ['./src/router/**/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOption);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _) => {
  res.status(err.status || 500);
  res.render('error');
});

export default app;
