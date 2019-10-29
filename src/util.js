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

export const parseAndDeleteArray = (arr, id) => {
  if (arr) {
    let array = arr.split(',');
    if (array.includes(id)) {
      array = array.filter(ele => ele !== id).join(',');
      return array;
    }
    return arr;
  }
  return null;
};
