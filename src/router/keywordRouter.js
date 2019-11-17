import express from 'express';
import routes from '../routes';
import { getKeywords } from '../controllers/keywordController';

const keywordRouter = express.Router();

keywordRouter.get(routes.home, getKeywords);

/**
 * @swagger
 * /keywords:
 *    get:
 *       summary: 모든 키워드 가져오기   
 *       tags: [Keyword]
 *       parameters:
 *       responses:
 *          200:
 *            description: 모든 키워드 가져오기
 *            schema: array
 *            items:
 *               type: object
 *               properties:
 *                  keywordId:
 *                      type: integer
 *                  name:
 *                      type: string
 *            example: [{"keywordId": 1,"name": "웹서비스"}]
 */                 

export default keywordRouter;
