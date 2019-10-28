import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: 'toys',
    password: 'toys',
    database: 'toys_db',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'no-op',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: 'no-op',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
};
