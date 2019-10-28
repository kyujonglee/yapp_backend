export default (sequelize) =>
  sequelize.define(
    'bookmark',
    {},
    { timestamps: false, freezeTableName: true }
  );
