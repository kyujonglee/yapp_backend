import express from 'express';
import routes from '../routes';
import { postLogin } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post(routes.getToken, postLogin);

export default authRouter;
