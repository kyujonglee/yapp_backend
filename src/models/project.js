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
      step: {
        type: DataTypes.INTEGER
      },
      location: {
        type: DataTypes.INTEGER
      },
      expectedPeriod: {
        type: DataTypes.INTEGER
      },
      thumbnailImage: {
        type: DataTypes.STRING(200)
      },
      attachFile: {
        type: DataTypes.STRING(200),
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
      isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    },
    { timestamps: false, freezeTableName: true }
  );
