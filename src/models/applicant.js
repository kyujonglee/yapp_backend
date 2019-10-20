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
      }
    },
    { timestamps: false, freezeTableName: true }
  );
