import bcrypt from 'bcrypt';
import { User } from '../models';
import { generateToken } from '../util';
import message from '../message';

export const postLogin = async (req, res) => {
  try {
    const {
      body: { email, password }
    } = req;
    const user = await User.findOne({ where: { email } });
    if(!user) {
      throw Error('user not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = generateToken(user.id);
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
