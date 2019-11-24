export default (sequelize, DataTypes) =>
  sequelize.define(
    'applicant',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER
      },
      profileImage: {
        type: DataTypes.STRING(200)
      },
      submitDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      },
      seenFlag: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );
