import express from 'express';
import routes from '../routes';
import { getSupports } from '../controllers/mypageController';
import { onlyPrivate } from '../middlewares';
import {
  chooseKeyword,
  deleteKeyword,
  getMypageKeywords
} from '../controllers/keywordController';

const mypageRouter = express.Router();

mypageRouter.get(routes.supports, onlyPrivate, getSupports);
mypageRouter.get(routes.keywords, onlyPrivate, getMypageKeywords);
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

//  *            schema:
//  *             type: object
//  *             properties:
//  *                keywordFromDb:
//  *                    type: array
//  *                    items:
//  *                      $ref: '#/definitions/Keyword'
//  *                keywordFromUser:
//  *                    type: array
//  *                    items:
//  *                        type: integer
