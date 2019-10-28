export default (sequelize, DataTypes) =>
  sequelize.define(
    'projectCart',
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
