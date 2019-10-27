"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  return sequelize.define('tbl_interview_question', {
    sn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;