export default sequelize =>
  sequelize.define(
    'projectRecruitRole',
    {},
    { timestamps: false, freezeTableName: true }
  );
