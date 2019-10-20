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
 *     tags : [JwtToken]
 *     parameters: 
 *         - in: query
 *           name: email
 *           schema: 
 *               type: string
 *           description: 이메일
 *         - in: query
 *           name: password
 *           schema: 
 *              type: string
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
