export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'projectCart',
      [
        { projectId: 1, title: '해커톤 팀원 모집', userId: 1 },
        { projectId: 2, title: '모임장소 추천서비스', userId: 1 }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('projectCart', null, {});
  }
};
