import express from 'express';
import routes from '../routes';
import { postlogin, getUser } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post(routes.login, postlogin);
authRouter.get('/user', getUser);

export default authRouter;
