export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'projectRecruitRole',
      [
        {
          projectId: 1,
          roleId: 1
        },
        {
          projectId: 1,
          roleId: 2
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('projectRecruitRole', null, {});
  }
};
