import express from 'express';
import routes from '../routes';
import { postLogin } from '../controllers/authController';

const authRouter = express.Router();
/**
 * @swagger
 * tags:
 *     name: JwtToken
 *     description: login 시 jwt token 얻기
 */

/**
 * @swagger
 * /auth/getToken:
 *   post:
 *     summary: Returns token
 *     consumes:
 *       - application/json
 *     tags : [JwtToken]
 *     parameters:
 *         - in: body
 *           name: email and password
 *           schema:
 *               type: object
 *               example : {email: 'kyujong93@naver.com', password: 'password1234!'}
 *               required:
 *               - email
 *               - password
 *               properties:
 *               email:
 *                   type: string
 *               password:
 *                   type: string
 *     responses:
 *       200:
 *         description: jwt token
 *         schema:
 *           type: string
 *           properties:
 *             token:
 *               type: string
 */

authRouter.post(routes.getToken, postLogin);

export default authRouter;
