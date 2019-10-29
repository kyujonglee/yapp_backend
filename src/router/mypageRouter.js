import express from 'express';
import routes from '../routes';
import { getSupports } from '../controllers/mypageController';
import { onlyPrivate } from '../middlewares';
import {
  getKeywords,
  chooseKeyword,
  deleteKeyword
} from '../controllers/keywordController';

const mypageRouter = express.Router();

mypageRouter.get(routes.supports, onlyPrivate, getSupports);
mypageRouter.get(routes.keywords, getKeywords);
mypageRouter.post(
  `${routes.keywords}${routes.keywordId}`,
  onlyPrivate,
  chooseKeyword
);
mypageRouter.delete(
  `${routes.keywords}${routes.keywordId}`,
  onlyPrivate,
  deleteKeyword
);

/**
 * @swagger
 * /mypage/keywords/{keywordId}:
 *   delete:
 *     summary: 사용자가 keyword를 삭제
 *     tags: [Keyword]
 *     parameters:
 *         - in : path
 *           name: keywordId
 *           schema:
 *              type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: Keyword list
 *         schema:
 *           type: boolean
 */

/**
 * @swagger
 * /mypage/keywords/{keywordId}:
 *   post:
 *     summary: 사용자가 keyword를 등록
 *     tags: [Keyword]
 *     parameters:
 *         - in : path
 *           name: keywordId
 *           schema:
 *              type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: Keyword list
 *         schema:
 *           type: boolean
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
