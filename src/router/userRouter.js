import express from 'express';
import routes from '../routes';
import { logout, postJoin } from '../controllers/userController';
import { postlogin } from '../controllers/authController';

const userRouter = express.Router();

userRouter.get(routes.logout, logout);
userRouter.post(routes.join, postJoin, postlogin);

export default userRouter;
