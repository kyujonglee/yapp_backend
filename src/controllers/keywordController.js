import { Keyword } from '../models';

export const getKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.findAll({});
    res.json(keywords);
  } catch (error) {
    res.json({ keyword: [] });
  }
};
