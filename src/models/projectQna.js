export default (sequelize, DataTypes) =>
  sequelize.define(
    "projectQna",
    {
      projectQnaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false, freezeTableName: true }
  );
