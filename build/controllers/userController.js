"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJoin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../models");

var saltRounds = 10;

var postJoin =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, password, nickname, age, user, passwordHash;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password, nickname = _req$body.nickname, age = _req$body.age;
            _context.next = 4;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 8;
              break;
            }

            res.json({
              message: 'duplicate Id'
            });
            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return _bcrypt["default"].hash(password, saltRounds);

          case 10:
            passwordHash = _context.sent;
            _context.next = 13;
            return _models.User.create({
              email: email,
              password: passwordHash,
              nickname: nickname,
              age: age
            });

          case 13:
            next();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              error: _context.t0
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;