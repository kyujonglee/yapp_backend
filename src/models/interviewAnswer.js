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
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
