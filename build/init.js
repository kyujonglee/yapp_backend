"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _models = require("./models");

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  console.log("\u2705 starting server on \uD83C\uDFE0 http://localhost:".concat(PORT));

  _models.sequelize.sync({
    force: true
  });
};

_app["default"].listen(PORT, handleListening);