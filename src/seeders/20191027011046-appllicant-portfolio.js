export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'tbl_applicant_portfolio',
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
    return queryInterface.bulkDelete('tbl_applicant_portfolio', null, {});
  }
};
