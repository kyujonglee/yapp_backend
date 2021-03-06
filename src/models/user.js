export default (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      location: {
        type: DataTypes.INTEGER
      },
      phone: {
        type: DataTypes.STRING(20)
      },
      flag: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      profileImage: {
        type: DataTypes.STRING(200)
      },
      keywords: {
        type: DataTypes.STRING(500)
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false, freezeTableName: true }
  );
