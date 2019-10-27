"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.postLogin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../models");

var _util = require("../util");

var _message = _interopRequireDefault(require("../message"));

var postLogin =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, passwordMatch, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 4;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 4:
            user = _context.sent;
            _context.next = 7;
            return _bcrypt["default"].compare(password, user.password);

          case 7:
            passwordMatch = _context.sent;

            if (passwordMatch) {
              token = (0, _util.generateToken)(user.id);
              res.status(200).json({
                token: token
              });
            } else {
              res.status(204).json({
                message: _message["default"].failId
              });
            }

            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              error: _context.t0
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function postLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var getUser = function getUser(req, res) {
  var user = req.user;

  if (user) {
    res.json({
      user: user
    });
  } else {
    res.json({
      message: '해당 사용자가 존재하지 않습니다.'
    });
  }
};

exports.getUser = getUser;