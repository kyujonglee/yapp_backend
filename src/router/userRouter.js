import express from 'express';
import routes from '../routes';
import { getUserKeywords } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get(routes.keywords, getUserKeywords);

/**
 * @swagger
 * tags:
 *   name: Keyword
 * definitions:
 *   Keyword:
 *     type: object
 *     properties:
 *       keywordId:
 *         type: integer
 *         description: ObjectID
 *         example : 1
 *       name:
 *         type: string
 *         description: 키워드명
 *         example: 기획자
 *       count:
 *         type: integer
 *         description: 프로젝트들의 키워드 수
 *         example : 0
 */

/**
 * @swagger
 * /user/keywords:
 *   get:
 *     summary: Returns keyword list
 *     tags: [Keyword]
 *     responses:
 *       200:
 *         description: Keyword list
 *         schema:
 *           type: object
 *           properties:
 *             keyword:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Keyword'
 */

export default userRouter;
