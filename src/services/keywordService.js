import { Keyword, User } from '../models';

export const getKeywordsDbAndUser = async userId => {
  try {
    const keywordFromDb = await Keyword.findAll({});
    const user = await User.findOne({ where: { userId } });
    const keywordFromUser = user.keywords
      ? user.keywords.split(',').map(ele => Number(ele))
      : null;
    return { keywordFromDb, keywordFromUser };
  } catch (error) {
    return null;
  }
};
