export default (sequelize, DataTypes) =>
  sequelize.define(
    'project',
    {
      projectId: {
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
      thumbnailImage: {
        type: DataTypes.STRING(200)
      },
      attachFile: {
        type: DataTypes.STRING(200)
      },
      viewCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false, freezeTableName: true }
  );
