"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET);
};

exports.generateToken = generateToken;