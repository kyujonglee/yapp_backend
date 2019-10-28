export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'bookmark',
      [
        {
          userId: 1,
          projectId: 1
        },
        {
          userId: 1,
          projectId: 2
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('bookmark', null, {});
  }
};
