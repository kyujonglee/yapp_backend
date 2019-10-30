import express from 'express';
import routes from '../routes';
import { getSupports } from '../controllers/mypageController';
import { onlyPrivate } from '../middlewares';
import {
  updateKeyword,
  getMypageKeywords
} from '../controllers/keywordController';

const mypageRouter = express.Router();

mypageRouter.get(routes.supports, onlyPrivate, getSupports);
mypageRouter.get(routes.keywords, onlyPrivate, getMypageKeywords);
mypageRouter.put(routes.keywords, onlyPrivate, updateKeyword);

/**
 * @swagger
 * /mypage/keywords:
 *   put:
 *     summary: 사용자의 keywords를 업데이트
 *     tags : [Keyword]
 *     parameters:
 *         - in: body
 *           name: keywords
 *           schema:
 *               type: array
 *               example : [1, 2, 5]
 *               items:
 *                  type: integer
 *     responses:
 *       200:
 *         description: success/fail
 *         schema:
 *           type: boolean
 *           example: true
 */

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
 *     summary: Returns Keyword list
 *     tags: [Keyword]
 *     responses:
 *       200:
 *         description: Keyword list
 *         schema:
 *           type: object
 *           properties:
 *             keywordFromDb:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Keyword'
 *               example : [{keywordId: 1, name: '개발자'}]
 *             keywordFromUser:
 *                type: array
 *                items:
 *                    type: integer
 *                    example: 2, 3, 4
 */

export default mypageRouter;
