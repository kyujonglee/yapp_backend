export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'applicantPortfolio',
      [
        {
          projectId: 1,
          userId: 2,
          portfolioId: 1
        },
        {
          projectId: 1,
          userId: 3,
          portfolioId: 3
        },
        {
          projectId: 1,
          userId: 3,
          portfolioId: 4
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('applicantPortfolio', null, {});
  }
};
