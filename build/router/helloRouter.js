"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _helloController = require("../controllers/helloController");

var helloRouter = _express["default"].Router();

helloRouter.get('/', _helloController.helloWorld);
var _default = helloRouter;
exports["default"] = _default;