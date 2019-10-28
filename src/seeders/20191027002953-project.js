export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'project',
      [
        {
          userId: 1,
          title: '해커톤 팀원 모집',
          content: '2019 yapp 해커톤에 참여하실 분들 구합니다. ',
        },
        {
          userId: 2,
          title: '모임장소 추천서비스',
          content: `모임장소 정할 때 중간지점 찾아주는 모바일 앱 서비스입니다. 서비스 기능 정의는 다 되어 있습니다! 현재 iOS 개발자와, 안드로이드 개발자 팀원이 있으며 서비스 디자인 해주실 디자이너 분이 필요한 상황입니다.`
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('project', null, {});
  }
};
