export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_interview_answer',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sn: {
        type: DataTypes.INTEGER
      }
    },
    { timestamps: false, freezeTableName: true }
  );
