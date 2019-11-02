import express from 'express';
import routes from '../routes';
import { getSupports } from '../controllers/mypageController';
import { getPortfolio, addPorfolio, updatePortfolio, deletePortfolio } from '../controllers/mypageController';
import { getRecruit } from '../controllers/mypageController';
import { onlyPublic, onlyPrivate } from '../middlewares';

const mypageRouter = express.Router();

mypageRouter.get(routes.supports, onlyPrivate, getSupports);

mypageRouter.get(routes.portfolio, onlyPrivate, getPortfolio);
mypageRouter.post(routes.portfolio, onlyPrivate, addPorfolio);
mypageRouter.put(routes.portfolio, onlyPrivate, updatePortfolio);
mypageRouter.delete(routes.portfolio, onlyPrivate, deletePortfolio);

mypageRouter.get(routes.recruit, onlyPrivate, getRecruit);
/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 * definitions:
 *   Project:
 *     type: object
 *     properties:
 *       projectId:
 *         type: integer
 *         description: ObjectID
 *       title:
 *         type: string
 *         description: 제목
 *       content:
 *         type: string
 *         description: 내용
 *       thumbnailImage:
 *         type: string
 *       attachFile:
 *          type: string
 *       viewCnt:
 *          type: integer
 *       createAt:
 *          type: date
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Returns Project list
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Project list
 *         schema:
 *           type: object
 *           properties:
 *             project:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Project'
 */

export default mypageRouter;
