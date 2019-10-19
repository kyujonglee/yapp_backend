import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './swagger';

import routes from './routes';
import authRouter from './router/authRouter';

import './passport';
import { authenticateJwt } from './middlewares';
import apiRouter from './router/apiRouter';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(authenticateJwt);

app.use(routes.auth, authRouter);
app.use(routes.api, apiRouter);

const swaggerOption = {
  swaggerDefinition,
  apis: ['./src/router/**/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOption);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
