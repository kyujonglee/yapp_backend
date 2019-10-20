export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_interview_question',
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
