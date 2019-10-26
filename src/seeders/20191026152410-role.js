export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'tbl_role',
      [
        {
          name: '기획자'
        },
        {
          name: '디자이너'
        },
        {
          name: '개발자'
        },
        {
          name: '기타'
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_role', null, {});
  }
};
