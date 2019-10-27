"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger"));

var _routes = _interopRequireDefault(require("./routes"));

var _authRouter = _interopRequireDefault(require("./router/authRouter"));

var _helloRouter = _interopRequireDefault(require("./router/helloRouter"));

require("./passport");

var _middlewares = require("./middlewares");

var _apiRouter = _interopRequireDefault(require("./router/apiRouter"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])('dev'));
app.use(_middlewares.authenticateJwt);
app.use(_routes["default"].auth, _authRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
app.use(_routes["default"].hello, _helloRouter["default"]);
var swaggerOption = {
  swaggerDefinition: _swagger["default"],
  apis: ['./src/router/**/*.js']
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(swaggerOption);
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
var _default = app;
exports["default"] = _default;