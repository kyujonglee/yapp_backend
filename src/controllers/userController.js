import bcrypt from 'bcrypt';
import { User, Portfolio } from '../models';
import { generateToken } from '../util';
import message from '../message';

const saltRounds = 10;

export const postJoin = async (req, res, next) => {
  try {
    const {
      body: { email, password, password2, name }
    } = req;
    if (password !== password2) {
      throw Error('비밀번호가 일치하지 않습니다.');
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw Error(message.alreadyUser);
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await User.create({
      email,
      password: passwordHash,
      name
    });
    next();
  } catch (error) {
    throw Error('cannot create user');
  }
};

export const postLogin = async (req, res) => {
  try {
    const {
      body: { email, password }
    } = req;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('user not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = generateToken(user.userId);
      res.json({ token });
    } else {
      throw Error(message.dismatchPassword);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const getUser = (req, res) => {
  const { user } = req;
  if (user) {
    res.json({ user });
  } else {
    res.json({ message: '해당 사용자가 존재하지 않습니다.' });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const {
      body: { email }
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    throw Error();
  }
};

export const getUserPortfolios = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;
    const portfolios = await Portfolio.findAll({ where: { userId } });
    res.json({ portfolios });
  } catch (error) {
    res.json({ portfolios: [] });
  }
};
