export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'projectQna',
      [
        {
          content: '안녕하세요 프로젝트에 궁금한 점 남깁니다.',
          userId: 3,
          projectId: 1
        },
        {
          content:
            '개발을 시작한지 얼마 안되는 개발자입니다. 저도 참여가능할까요? 열심히 하겠습니다!',
          userId: 3,
          projectId: 1
        },
        {
          content: '네 무엇이든지 물어보세요.',
          parentId: 1,
          projectId: 1,
          userId: 1
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('projectQna', null, {});
  }
};
