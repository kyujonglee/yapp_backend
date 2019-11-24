import { User, Keyword, ProjectKeyword } from '../models';
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
      body: { keywords },
      user: { userId }
    } = req;
    await User.update(
      { keywords: keywords && keywords.length ? keywords.join(',') : null },
      { where: { userId } }
    );
    res.json(true);
  } catch (error) {
    res.json(false);
  }
};

export const getKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.findAll({
      include: [{ model: ProjectKeyword }]
    }).map(keyword => ({
      keywordId: keyword.keywordId,
      name: keyword.name,
      count: keyword.projectKeywords.length
    }));

    res.json(keywords);
  } catch (error) {
    throw Error(error.message);
  }
};
