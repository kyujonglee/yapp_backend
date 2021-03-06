export default (sequelize, DataTypes) =>
  sequelize.define(
    'keyword',
    {
      keywordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
