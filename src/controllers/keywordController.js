import { User } from '../models';
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

export const updateKeyword = async (req, res) => {
  try {
    const {
      body: keywords,
      user: { userId }
    } = req;
    await User.update(
      { keywords: keywords && keywords.length ? keywords.join(',') : null },
      { where: { userId } }
    );
    res.json(true);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
