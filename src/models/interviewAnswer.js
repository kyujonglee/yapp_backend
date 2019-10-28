export default (sequelize, DataTypes) =>
  sequelize.define(
    'interviewAnswer',
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
