"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _projectRouter = _interopRequireDefault(require("./api/projectRouter"));

var apiRouter = _express["default"].Router();

apiRouter.use(_routes["default"].projects, _projectRouter["default"]);
var _default = apiRouter;
exports["default"] = _default;