export default (sequelize, DataTypes) =>
  sequelize.define(
    'tbl_applicant',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
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
      }
    },
    { timestamps: false, freezeTableName: true }
  );
