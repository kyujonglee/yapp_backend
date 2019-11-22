export default (sequelize, DataTypes) =>
  sequelize.define(
    'projectQna',
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
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false, freezeTableName: true }
  );
