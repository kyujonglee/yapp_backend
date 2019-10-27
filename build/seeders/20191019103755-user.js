"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _default = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(queryInterface) {
      var saltRounds;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              saltRounds = 10;
              _context.t0 = queryInterface;
              _context.next = 4;
              return _bcrypt["default"].hash('toddlf20', saltRounds);

            case 4:
              _context.t1 = _context.sent;
              _context.t2 = {
                name: '이규종',
                email: 'kyujong93@naver.com',
                password: _context.t1
              };
              _context.next = 8;
              return _bcrypt["default"].hash('toddlf20', saltRounds);

            case 8:
              _context.t3 = _context.sent;
              _context.t4 = {
                name: '이규종2',
                email: 'kyujong93@gmail.com',
                password: _context.t3
              };
              _context.t5 = [_context.t2, _context.t4];
              _context.t6 = {};
              return _context.abrupt("return", _context.t0.bulkInsert.call(_context.t0, 'tbl_user', _context.t5, _context.t6));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('tbl_user', null, {});
  }
};
exports["default"] = _default;