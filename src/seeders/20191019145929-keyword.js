export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'tbl_keyword',
      [
        {
          name: '웹서비스'
        },
        {
          name: '디자인'
        },
        {
          name: 'UX/UI'
        },
        {
          name: 'ios'
        },
        {
          name: 'android'
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_keyword', null, {});
  }
};
