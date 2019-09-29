import { User } from '../models';
import message from '../message';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: message.successLogout });
};

export const postJoin = async (req, res, next) => {
  try {
    const {
      body: { email, password, name, age }
    } = req;
    console.log(email, password, name, age);
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json({ message: 'duplicate Id' });
      return;
    } else {
      const passwordHash = await bcrypt.hash(password, saltRounds);
      await User.create({
        email,
        password: passwordHash,
        name,
        age
      });
      next();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
