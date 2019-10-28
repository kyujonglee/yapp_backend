export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'projectKeyword',
      [
        {
          projectId: 1,
          keywordId: 1
        },
        {
          projectId: 1,
          keywordId: 2
        },
        {
          projectId: 1,
          keywordId: 10
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('projectKeyword', null, {});
  }
};
