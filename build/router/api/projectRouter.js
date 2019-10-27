"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../../routes"));

var _projectController = require("../../controllers/projectController");

var projectRouter = _express["default"].Router();
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


projectRouter.post(_routes["default"].home, _projectController.findProjects);
var _default = projectRouter;
exports["default"] = _default;