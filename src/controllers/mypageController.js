import { Project, Applicant, Role, Portfolio } from '../models';

export const getSupports = async (req, res) => {
  const { user } = req;
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Applicant,
          where: { userId: user.userId },
          include: [{ model: Role }]
        }
      ]
    });
    res.json(projects);
  } catch (error) {
    res.json(error);
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;

    const portfolios = await Portfolio.findAll({
      where: { userId },
      order: [['portfolioId', 'ASC']]
    });
    res.json({ portfolios });

  } catch (error) {
    throw Error(error);
  }
};

export const addPorfolio = async (req, res) => {
  try{
    const {
      body: { title, myRole, useStack, thumbnailImage, attachFile },
      user: { userId }
    } = req;

    await Portfolio.create({
      title, myRole, useStack, thumbnailImage, attachFile, userId
    });
    res.status(200).json({ message: 'success' });

  } catch (error) {
    throw Error(error);
  }
};

export const updatePortfolio = async (req, res) => {
  try{
    const {
      body: { portfolioId, title, myRole, useStack, thumbnailImage, attachFile }
    } = req;

    await Portfolio.update(
      { title, myRole, useStack, thumbnailImage, attachFile },
      { where : { portfolioId }
    });
    res.status(200).json({ message: 'success' });

  } catch (error) {
    throw Error(error);
  }
};

export const deletePortfolio = async (req, res) => {
  try{
    const {
      body: { portfolioId }
    } = req;

    await Portfolio.destroy({
      where: { portfolioId }
    });
    res.status(200).json({ message: 'success' });

  } catch (error) {
    throw Error(error);
  }
};

export const getRecruit = async (req, res) => {
  try{
    const {
      user: { userId }
    } = req;

    const recruitProjects = await Project.findAll({
      where: { userId },
      order: [['step', 'ASC'], ['projectId', 'ASC']]
    });
    res.json({ recruitProjects });

  } catch (error) {
    throw Error(error);
  }
};
