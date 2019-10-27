"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _authController = require("../controllers/authController");

var authRouter = _express["default"].Router();
/**
 * @swagger
 * tags:
 *     name: JwtToken
 *     description: login 시 jwt token 얻기
 */

/**
 * @swagger
 * /auth/getToken:
 *   post:
 *     summary: Returns token
 *     tags : [JwtToken]
 *     parameters: 
 *         - in: query
 *           name: email
 *           schema: 
 *               type: string
 *           description: 이메일
 *         - in: query
 *           name: password
 *           schema: 
 *              type: string
 *     responses:
 *       200:
 *         description: jwt token
 *         schema:
 *           type: string
 *           properties:
 *             token:
 *               type: string
 */


authRouter.post(_routes["default"].getToken, _authController.postLogin);
var _default = authRouter;
exports["default"] = _default;