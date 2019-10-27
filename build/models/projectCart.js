"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  return sequelize.define('tbl_project_cart', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;