"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(queryInterface) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", queryInterface.bulkInsert('tbl_keyword', [{
                name: '웹서비스'
              }, {
                name: '디자인'
              }, {
                name: 'UX/UI'
              }, {
                name: 'ios'
              }, {
                name: 'android'
              }], {}));

            case 1:
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
    return queryInterface.bulkDelete('tbl_keyword', null, {});
  }
};
exports["default"] = _default;