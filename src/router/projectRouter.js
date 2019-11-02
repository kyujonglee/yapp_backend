import express from 'express';
import routes from '../routes';
import { findProjects, getProject } from '../controllers/projectController';
import { enrollApplicant } from '../controllers/applicantController';
import { onlyPrivate } from '../middlewares';

const projectRouter = express.Router();

projectRouter.get(routes.home, findProjects);
projectRouter.get(routes.projectId, getProject);
projectRouter.post(
  `${routes.projectId}${routes.applicants}`,
  onlyPrivate,
  enrollApplicant
);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Returns Project detail
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Project detail
 *         schema:
 *           type: object
 *           properties:
 *              projectId:
 *                  type: integer
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              thumbnailImage:
 *                  type: string
 *              attachFile:
 *                  type: string
 *              viewCnt:
 *                  type: integer
 *              createAt:
 *                  type: date
 *              userId:
 *                  type: string
 *              projectRecruitRoles:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                      id:
 *                          type: integer
 *                      roleId:
 *                          type: integer
 *                      name:
 *                          type: string
 *                      example : {id: 1, roleId: 1, name: '기획자'}
 *              interviewQuestions:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                      sn:
 *                          type: integer
 *                      content:
 *                          type: string
 *                      example : {sn: 1, content: '일주일에 1회 시간내서 참여 가능하신가요?'}
 */

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

export default projectRouter;
