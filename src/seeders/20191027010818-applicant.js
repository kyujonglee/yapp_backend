export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'applicant',
      [
        {
          projectId: 1,
          userId: 2,
          name : '이규종2',
          role: 4,
        },
        {
          projectId: 1,
          userId: 3,
          name : 'gogogo',
          role: 1,
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('applicant', null, {});
  }
};
