export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'interviewQuestion',
      [
        {
          projectId: 1,
          sn : 1,
          content: '일주일에 몇 회정도 참여 가능하신가요?',
          role: 0
        },
        {
          projectId: 1,
          sn : 2,
          content: '개발자와 협업 경험이 있으신가요?',
          role: 2
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('interviewQuestion', null, {});
  }
};
