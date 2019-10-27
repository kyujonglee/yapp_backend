"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  return sequelize.define('tbl_portfolio', {
    portfolioId: {
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
    attachFile: {
      type: DataTypes.STRING(200)
    },
    accessList: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};

exports["default"] = _default;