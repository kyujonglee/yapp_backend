import path from 'path';
import Sequelize from 'sequelize';
import UserModel from './user';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const User = UserModel(sequelize, Sequelize);

sequelize.sync();
