import express from 'express';
import routes from '../routes';
import {
  findProjects,
  getProject,
  enrollProject
} from '../controllers/projectController';
import { enrollApplicant } from '../controllers/applicantController';
import { onlyPrivate, uploadProjectImage } from '../middlewares';

const projectRouter = express.Router();

projectRouter.get(routes.home, findProjects);
projectRouter.post(routes.home, onlyPrivate, uploadProjectImage, enrollProject);

projectRouter.get(routes.projectId, getProject);
projectRouter.post(
  `${routes.projectId}${routes.applicants}`,
  onlyPrivate,
  enrollApplicant
);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 모집글 작성
 *     tags: [Project]
 *     parameters: 
 *        - in: body
 *          name: 프로젝트 정보
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  role:
 *                      type: integer
 *                  step:
 *                      type: integer
 *                  location:
 *                      type: integer
 *                  thumbnailImage:
 *                      type: string
 *                  
 *          example: { 
 *              title: '안녕하세요 타이틀입니다',
 *              content: '안녕하세요 내용입니다.',
 *              role: 5,
 *              step: 1,
 *              location: 2,
 *              thumbnailImage: 'http://ncloud'
 *          }
 *     responses:
 *       200:
 *         description: 모집글 작성 성공
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * tags:
 *    name: Applicant
 */

/**
 * @swagger
 * /projects/{projectId}/applicants:
 *   post:
 *     summary: 해당 프로젝트에 지원하기
 *     tags: [Applicant]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *              type: integer
 *         required: true
 *         example: 1
 *       - in: body
 *         name: role, portfolios, answers
 *         schema:
 *             type: object
 *             properties:
 *               role:
 *                   type: integer
 *               portfolios:
 *                   type: array
 *                   items:
 *                      type: integer
 *                   example: [1, 2]
 *               answers :
 *                   type : array
 *                   items:
 *                     type: object
 *                     properties:
 *                         sn:
 *                             type: integer
 *                         content:
 *                             type: string
 *                     example: {"sn": 1, "content": "네 참여할 수 있습니다."}
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
 *              role:
 *                  type: integer
 *              viewCnt:
 *                  type: integer
 *              createAt:
 *                  type: date
 *              userId:
 *                  type: string
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
 *              role:
 *                  type: integer
 *              viewCnt:
 *                  type: integer
 *              createAt:
 *                  type: date
 *              userId:
 *                  type: string
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
 *       role:
 *          type: integer
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
 *     summary: 메인페이지 프로젝트 limit 12개 불러오기
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
