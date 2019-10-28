export default (sequelize, DataTypes) =>
  sequelize.define(
    'interviewQuestion',
    {
      sn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
