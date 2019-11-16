export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'interviewAnswer',
      [
        {
          content: '네 모두 참여 가능합니다.',
          sn: 1,
          userId: 3,
          projectId: 1
        },
        {
          content: '네 동아리에서 참여한 경험이 있습니다.',
          sn: 2,
          userId: 3,
          projectId: 1
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('interviewAnswer', null, {});
  }
};
