export default {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Applicant',
        'isAccepted',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
