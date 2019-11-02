import { Project, Applicant, Portfolio, ApplicationPortfolio, InterviewAnswer, InterviewQuestion, User, sequelize } from '../models';

export const getSupports = async (req, res) => {
  const { user } = req;
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Applicant,
          where: { userId: user.userId }
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

async function getApplicants(projectId){
  const query = 'SELECT appl.userId, appl.name, appl.profileImage, appl.role, (SELECT COUNT(ap.projectId) FROM applicantPortfolio as ap WHERE ap.projectId=appl.projectId ) as portfolioCnt FROM applicant as appl where appl.projectId= :projectId order by appl.role, appl.userId ASC';
  const applicants = await sequelize.query(query, {replacements: { projectId }});

  return applicants;
};

export const getRecruit = async (req, res) => {
  try{
    const {
      user: { userId }
    } = req;

    const recruitProjects = await Project.findAll({
      attributes : ['projectId', 'title', 'step', 'role'],
      where: { userId },
      order: [['step', 'ASC'], ['projectId', 'ASC']]
    });

    for (let i of recruitProjects){
      const projectId = i.projectId;
      // WHY ??
      i.dataValues.applicants = (await getApplicants(projectId))[0];
    }

    res.json({ recruitProjects });

  } catch (error) {
    throw Error(error);
  }
};

export const getApplicantDetail = async (req, res) => {
  try{
    const {
      body : { applicantId },
      params: { projectId }
    } = req;

    const projectAndInterview = await Project.findAll({
      include: [{ model: InterviewQuestion},
                {model: InterviewAnswer, where: { userId: applicantId }}]
    });

    const applicant = await User.findAll({
      attributes: ['email', 'name', 'profileImage'],
      where: { userId: applicantId }
    });

    const portfolioQuery = 'SELECT p.portfolioId, p.title, p.useStack, p.myRole, p.thumbnailImage, p.attachFile FROM portfolio as p, applicantPortfolio as a WHERE a.projectId=:projectId AND a.userId=:userId AND a.portfolioId=p.portfolioId';
    const portfolios = await sequelize.query(portfolioQuery, {replacements: { projectId: projectId, userId:applicantId }});

    res.json({'project':projectAndInterview, 'applicant':applicant, 'portfolios':portfolios[0]});

  } catch (error) {
    throw Error(error);
  }
};
