import bcrypt from 'bcrypt';
import { User } from '../models';

const saltRounds = 10;

export const postJoin = async (req, res, next) => {
  try {
    const {
      body: { email, password, nickname, age }
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json({ message: 'duplicate Id' });
      return;
    } 
      const passwordHash = await bcrypt.hash(password, saltRounds);
      await User.create({
        email,
        password: passwordHash,
        nickname,
        age
      });
      next();
    
  } catch (error) {
    res.status(400).json({ error });
  }
};
