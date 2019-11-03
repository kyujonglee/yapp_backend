import express from 'express';
import routes from '../routes';
import {
  getUserPortfolios,
  getUserKeywords,
  updateUserProfile,
  getUserProfile
} from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.portfolios, onlyPrivate, getUserPortfolios);
userRouter.get(routes.keywords, onlyPrivate, getUserKeywords);
userRouter.put(routes.profile, onlyPrivate, uploadAvatar, updateUserProfile);
userRouter.get(routes.profile, onlyPrivate, getUserProfile);

/**
 * @swagger
 * tags:
 *  name: User Profile
 */

/**
 * @swagger
 * /user/profile:
 *  put:
 *     summary: 프로필 수정
 *     tags: [User Profile]
 *     parameters:
 *        - in: body
 *          schema:
 *              type: object
 *              properties:
 *                 name:
 *                    type: string
 *                 location:
 *                    type: integer
 *                 phone:
 *                    type: string
 *                 flag:
 *                    type: integer
 *                 profileImage:
 *                    type: string
 *     responses:
 *       200:
 *         description: User에 대한 정보
 *         schema:
 *           type: boolean
 *           example : true
 */

/**
 * @swagger
 * /user/profile:
 *  get:
 *     summary: 프로필 수정에서 user에 대한 정보 가져오기
 *     tags: [User Profile]
 *     responses:
 *       200:
 *         description: User에 대한 정보
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *                type: string
 *             profileImage:
 *                type: string
 *             location:
 *                type: integer
 *             flag:
 *                type: integer
 *             phone:
 *                type: string
 *
 */

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
