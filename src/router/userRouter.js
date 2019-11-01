import express from 'express';
import routes from '../routes';
import { getUserPortfolios } from '../controllers/userController';
import { onlyPrivate } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.portfolios, onlyPrivate, getUserPortfolios);

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: User Portfolio list
 * definitions:
 *   Portfolio:
 *     type: object
 *     properties:
 *       portfolioId:
 *         type: integer
 *         description: ObjectID
 *       title:
 *         type: string
 *         description: 제목
 *       myRole:
 *         type: string
 *         description: 내가 맡은 부분
 *       thumbnailImage:
 *         type: string
 *       attachFile:
 *          type: string
 *       useStack:
 *          type: string
 */

/**
 * @swagger
 * /user/portfolios:
 *   get:
 *     summary: return user's portfolios
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: user portfolios
 *         schema:
 *           type: object
 *           properties:
 *             portfolios:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Portfolio'
 */

export default userRouter;
