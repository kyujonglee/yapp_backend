export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_role',
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
