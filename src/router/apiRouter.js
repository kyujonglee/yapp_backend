import express from 'express';
import routes from '../routes';
import projectRouter from './api/projectRouter';

const apiRouter = express.Router();

apiRouter.use(routes.projects, projectRouter);

export default apiRouter;