import { User } from '../models';
import message from '../message';
import { parseAndUpdateArray, parseAndDeleteArray } from '../util';
import { getKeywordsDbAndUser } from '../services/keywordService';

export const getMypageKeywords = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;
    const keywords = await getKeywordsDbAndUser(userId);
    res.json(keywords);
  } catch (error) {
    throw Error();
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

export const deleteKeyword = async (req, res) => {
  try {
    const {
      params: { keywordId },
      user: { userId }
    } = req;
    const user = await User.findOne({ where: { userId } });
    await User.update(
      { keywords: parseAndDeleteArray(user.keywords, keywordId) },
      { where: { userId } }
    );
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    throw Error(message.failDeleteKeyword);
  }
};
