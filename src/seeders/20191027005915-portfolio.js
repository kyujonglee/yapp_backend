export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'portfolio',
      [
        {
          userId: 2,
          title: '어린이들을 위한 safe map',
          myRole: `백엔드를 담당했으며, t-map, kakao 지도 api를 통해서 사용자에게 경찰서, 어린이 지킴이집 등의 위치를 제공합니다.`,
          useStack: 'Flask, python, javascript'
        },
        {
          userId: 2,
          title: '의료검색엔진',
          myRole: `환자들에게 검색에 더 유연한 결과를 줍니다.`,
          useStack: 'ELK, django'
        },
        {
          userId: 3,
          title: 'portfolio~~!!!!',
          myRole: `조장역할을 맡아서 진행함!`,
          useStack: 'spring, mybatis, mysql, jQuery'
        },
        {
          userId: 3,
          title: 'portfolio~~!!!',
          myRole: `프론트 부분을 맡아서 진행함.`,
          useStack: 'spring, mybatis, mysql, react'
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('portfolio', null, {});
  }
};
