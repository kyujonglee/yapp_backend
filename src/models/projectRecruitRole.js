export default (sequelize) =>
  sequelize.define(
    'projectRecruitKeyword',
    {},
    { timestamps: false, freezeTableName: true }
  );
