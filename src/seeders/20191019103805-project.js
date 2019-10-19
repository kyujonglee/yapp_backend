export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'tbl_project',
      [
        {
          title: '공방 관련된 프로젝트를 모집 중입니다!',
          content:
            '실력이 좀 부족하더라도 다같이 배우면서 프로젝트를 진행했으면 좋겠습니다.',
          thumbnailImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUjasKSUNh11xl-WI2ttAzYaoP7x7W45fmJK8GBSHl-86dMAjd',
          writerId: 1
        },
        {
          title:
            '자신이 사용하고 싶은 기술을 사용해서 클론 코딩을 하고 싶은 분 모집합니다.!',
          content:
            '실력이 좀 부족하더라도 다같이 배우면서 프로젝트를 진행했으면 좋겠습니다.',
          thumbnailImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUjasKSUNh11xl-WI2ttAzYaoP7x7W45fmJK8GBSHl-86dMAjd',
            writerId: 2
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_project', null, {});
  }
};
