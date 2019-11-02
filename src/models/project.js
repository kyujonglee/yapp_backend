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
        type: DataTypes.TEXT,
        defaultValue: ''
      },
      role: {
        type: DataTypes.INTEGER
      },
      thumbnailImage: {
        type: DataTypes.STRING(200)
      },
      attachFile: {
        type: DataTypes.STRING(200),
        defaultValue: ''
      },
      viewCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      },
      step: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      location: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false, freezeTableName: true }
  );
