export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_keyword',
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
