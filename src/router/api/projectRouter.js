import express from 'express';
import routes from '../../routes';
import { findProjects } from '../../controllers/projectController';

const projectRouter = express.Router();

projectRouter.post(routes.home, findProjects)

export default projectRouter;