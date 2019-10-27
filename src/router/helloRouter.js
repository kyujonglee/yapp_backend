import express from 'express';
import { helloWorld } from '../controllers/helloController';

const helloRouter = express.Router();

helloRouter.get('/', helloWorld);

export default helloRouter;