"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  return sequelize.define('tbl_project', {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    thumbnailImage: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    attachFile: {
      type: DataTypes.STRING(200)
    },
    viewCnt: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('NOW()')
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;