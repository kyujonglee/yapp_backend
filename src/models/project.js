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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      step: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      currentMember: {
        type: DataTypes.STRING,
        defaultValue: '000'
      },
      location: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      expectedPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
