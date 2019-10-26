export default (sequelize) =>
  sequelize.define(
    'tbl_applicant_portfolio',
    {},
    { timestamps: false, freezeTableName: true }
  );
