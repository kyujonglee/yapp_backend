import express from 'express';
import routes from '../../routes';
import { findProjects } from '../../controllers/projectController';

const projectRouter = express.Router();

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
 * /api/projects:
 *   post:
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
projectRouter.post(routes.home, findProjects);

export default projectRouter;
