export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert('tbl_project_keyword', [], {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_project_keyword', null, {});
  }
};
