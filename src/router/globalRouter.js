import express from 'express';
import routes from '../routes';
import { postLogin, postJoin, checkEmail } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.post(routes.getToken, postLogin);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.post(routes.checkEmail, checkEmail);

/**
 * @swagger
 * tags:
 *     name: 이메일 중복 체크
 */

/**
 * @swagger
 * /checkEmail:
 *     post:
 *         summary: email 중복체크
 *         tags: [이메일 중복 체크]
 *         parameters:
 *             - in: body
 *               name: email
 *               schema:
 *                  type: string
 *                  example: {"email": "gogogo@gmail.com"}
 *                  required: email
 *         responses:
 *             200:
 *                 description: email이 중복되었을 때 false, 중복이 안되었을 때 true
 *                 schema:
 *                     type: boolean
 *                     example: true
 */

/**
 * @swagger
 * tags:
 *     name: 회원가입
 */

/**
 * @swagger
 * /join:
 *   post:
 *     summary: 회원가입 처리
 *     consumes:
 *       - application/json
 *     tags : [회원가입]
 *     parameters:
 *         - in: body
 *           name: email, password, name
 *           schema:
 *               type: object
 *               example : {email: 'kyujong93@naver.com', password: 'password1234!', password2: 'password1234!', name: '이규종'}
 *               required:
 *               - email
 *               - password
 *               - name
 *               properties:
 *               email:
 *                   type: string
 *               password:
 *                   type: string
 *               name :
 *                   type : string
 *     responses:
 *       200:
 *         description: 회원가입 후 로그인 로직을 수행하여 jwt token을 반환할 것임!
 *         schema:
 *           type: string
 *           properties:
 *             token:
 *               type: string
 */

/**
 * @swagger
 * tags:
 *     name: JwtToken
 *     description: login 시 jwt token 얻기
 */

/**
 * @swagger
 * /getToken:
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

export default globalRouter;
