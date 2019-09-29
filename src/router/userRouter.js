import express from 'express';
import routes from '../routes';
import { logout } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get(routes.logout, logout);

export default userRouter;
