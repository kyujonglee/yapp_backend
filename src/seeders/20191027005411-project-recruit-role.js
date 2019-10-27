export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'tbl_project_recruit_keyword',
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
    return queryInterface.bulkDelete('tbl_project_recruit_keyword', null, {});
  }
};
