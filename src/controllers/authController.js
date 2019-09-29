import { User } from '../models';
import bcrypt from 'bcrypt';
import { generateToken } from '../util';
import message from '../message';

export const postlogin = async (req, res) => {
  try {
    const {
      body: { email, password }
    } = req;
    const user = await User.findOne({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = generateToken(user.id);
      res.status(200).json({ token });
    } else {
      res.status(204).json({ message: message.failId });
    }
  } catch (error) {
    res.status(400).json({ error });
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
