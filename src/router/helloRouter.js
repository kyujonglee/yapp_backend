import express from 'express';
import routes from '../routes';
import { helloWorld } from '../controllers/helloController';

const helloRouter = express.Router();

helloRouter.get(routes.home, helloWorld);

export default helloRouter;
