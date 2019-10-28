import { Keyword, User } from '../models';
import message from '../message';
import { parseAndUpdateArray } from '../util';

export const getKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.findAll({});
    res.json(keywords);
  } catch (error) {
    res.json({ keyword: [] });
  }
};

export const chooseKeyword = async (req, res) => {
  try {
    const {
      params: { keywordId },
      user: { userId }
    } = req;
    const user = await User.findOne({ where: { userId } });
    await User.update(
      { keywords: parseAndUpdateArray(user.keywords, keywordId) },
      { where: { userId } }
    );
    res.status(200).json(true);
  } catch (error) {
    throw Error(message.failChooseKeyword);
  }
};
