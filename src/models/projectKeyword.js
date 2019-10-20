export default (sequelize) =>
  sequelize.define(
    'tbl_project_keyword',
    {},
    { timestamps: false, freezeTableName: true }
  );
