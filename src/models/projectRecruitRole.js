export default (sequelize) =>
  sequelize.define(
    'tbl_project_recruit_keyword',
    {},
    { timestamps: false, freezeTableName: true }
  );
