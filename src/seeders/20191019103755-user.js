import bcrypt from 'bcrypt';

export default {
  up: async queryInterface => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      'tbl_user',
      [
        {
          nickname: 'KyuKyu',
          email: 'kyujong93@naver.com',
          password: await bcrypt.hash('toddlf20', saltRounds)
        },
        {
          nickname: 'beautiful name',
          email: 'kyujong93@gmail.com',
          password: await bcrypt.hash('toddlf20', saltRounds)
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tbl_user', null, {});
  }
};
