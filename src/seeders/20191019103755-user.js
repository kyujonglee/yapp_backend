import bcrypt from 'bcrypt';

export default {
  up: async queryInterface => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      'user',
      [
        {
          name: '이규종',
          email: 'kyujong93@naver.com',
          password: await bcrypt.hash('toddlf20', saltRounds),
          keywords: '4,2,9'
        },
        {
          name: '이규종2',
          email: 'kyujong93@gmail.com',
          password: await bcrypt.hash('toddlf20', saltRounds),
          keywords: '1,5,10'
        },
        {
          name: 'gogogo',
          email: 'gogogo@gogo.com',
          password: await bcrypt.hash('toddlf20', saltRounds),
          keywords: '2,3,4'
        }
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
