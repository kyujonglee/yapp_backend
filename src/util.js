import jwt from 'jsonwebtoken';

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const parseAndUpdateArray = (arr, id) => {
  if (arr) {
    const array = arr.split(',');
    if (array.includes(id)) {
      return arr;
    }
    return `${arr},${id}`;
  }
  return `${id}`;
};
