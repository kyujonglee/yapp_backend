export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_project_cart',
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
