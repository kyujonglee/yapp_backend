export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'applicantPortfolio',
      [
        {
          projectId: 1,
          userId: 2,
          portfolioId: 1
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('applicantPortfolio', null, {});
  }
};
