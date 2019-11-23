import jwt from 'jsonwebtoken';

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const isNull = (...args) => {
  for (const item of args) {
    if (!item) return false;
  }
  return true;
};
