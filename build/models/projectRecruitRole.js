"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize) {
  return sequelize.define('tbl_project_recruit_keyword', {}, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;