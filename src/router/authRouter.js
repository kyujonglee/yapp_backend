import express from 'express';
import routes from '../routes';
import { postlogin } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post(routes.login, postlogin);

export default authRouter;