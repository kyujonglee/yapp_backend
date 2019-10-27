"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  return sequelize.define('tbl_interview_answer', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sn: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;