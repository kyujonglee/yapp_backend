export default (sequelize, DataTypes) => sequelize.define('tb_user', {
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
});