export default (sequelize, DataTypes) =>
  sequelize.define('tb_user', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  });
