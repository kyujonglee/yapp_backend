export default (sequelize) =>
  sequelize.define(
    'projectKeyword',
    {},
    { timestamps: false, freezeTableName: true }
  );
