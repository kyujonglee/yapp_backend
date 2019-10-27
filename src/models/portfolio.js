export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_portfolio',
    {
      portfolioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      myRole: {
        type: DataTypes.STRING(500)
      },
      useStack : {
        type: DataTypes.STRING(500)
      },
      thumbnailImage: {
        type: DataTypes.STRING(200)
      },
      attachFile: {
        type: DataTypes.STRING(200)
      }
    },
    { timestamps: false, freezeTableName: true }
  );
