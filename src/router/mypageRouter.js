import express from 'express';
import routes from '../routes';
import { getSupports } from '../controllers/mypageController';
import { onlyPrivate } from '../middlewares';
import { getKeywords } from '../controllers/keywordController';

const mypageRouter = express.Router();

mypageRouter.get(routes.supports, onlyPrivate, getSupports);
mypageRouter.get(routes.keywords, getKeywords);

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
 *       name:
 *         type: string
 *         description: 키워드명
 */

/**
 * @swagger
 * /mypage/keywords:
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

export default mypageRouter;
