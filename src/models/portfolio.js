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
      content: {
        type: DataTypes.TEXT
      },
      attachFile: {
        type: DataTypes.STRING(200)
      },
      accessList : {
        type: DataTypes.STRING
      }
    },
    { timestamps: false, freezeTableName: true }
  );
