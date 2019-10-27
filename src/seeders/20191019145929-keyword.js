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
        },
        {
          name: 'JAVA'
        },
        {
          name: 'AI'
        },
        {
          name: '해커톤'
        },
        {
          name: 'IOT'
        },
        {
          name: '공모전'
        },
        {
          name: 'PYTHON'
        },
        {
          name: '프론트'
        },
        {
          name: '백엔드'
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_keyword', null, {});
  }
};
