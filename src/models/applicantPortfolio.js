export default (sequelize) =>
  sequelize.define(
    'applicantPortfolio',
    {},
    { timestamps: false, freezeTableName: true }
  );
