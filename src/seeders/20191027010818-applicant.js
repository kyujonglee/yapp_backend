export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'applicant',
      [
        {
          projectId: 1,
          userId: 2,
          name : '이규종2',
          roleId: 3,
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('applicant', null, {});
  }
};
