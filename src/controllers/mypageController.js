/* eslint-disable prefer-destructuring */
import {
  Project,
  Applicant,
  Portfolio,
  InterviewAnswer,
  InterviewQuestion,
  User,
  sequelize
} from '../models';

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
  try {
    const {
      body: { title, myRole, useStack, attachFile },
      user: { userId }
    } = req;

    await Portfolio.create({
      title,
      myRole,
      useStack,
      thumbnailImage: req.file ? req.file.location : null,
      attachFile,
      userId
    });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    throw Error(error);
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const {
      body: { portfolioId, title, myRole, useStack, attachFile }
    } = req;

    if(req.file){
      await Portfolio.update(
        {
          title,
          myRole,
          useStack,
          thumbnailImage: req.file.location,
          attachFile
        },
        { where: { portfolioId } }
      );
    }
    else{
      await Portfolio.update(
        {
          title,
          myRole,
          useStack,
          attachFile
        },
        { where: { portfolioId } }
      );
    }
    res.status(200).json({ message: 'success' });
  } catch (error) {
    throw Error(error);
  }
};

export const deletePortfolio = async (req, res) => {
  try {
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

async function getApplicants(projectId) {
  const query =
    'SELECT appl.userId, appl.name, appl.profileImage, appl.role, (SELECT COUNT(ap.projectId) FROM applicantPortfolio as ap WHERE ap.projectId=appl.projectId ) as portfolioCnt FROM applicant as appl where appl.projectId= :projectId order by appl.role, appl.userId ASC';
  const applicants = await sequelize.query(query, {
    replacements: { projectId }
  });

  return applicants;
}

export const getRecruit = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;

    const recruitProjects = await Project.findAll({
      attributes: ['projectId', 'title', 'step', 'role'],
      where: { userId },
      order: [
        ['step', 'ASC'],
        ['projectId', 'ASC']
      ]
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const i of recruitProjects) {
      const { projectId } = i;
      // WHY ??
      i.dataValues.applicants = (await getApplicants(projectId))[0];
    }

    res.json({ recruitProjects });
  } catch (error) {
    throw Error(error);
  }
};

export const getApplicantDetail = async (req, res) => {
  try {
    const {
      body: { applicantId },
      params: { projectId }
    } = req;

    const projectAndInterview = await Project.findAll({
      include: [
        { model: InterviewQuestion },
        { model: InterviewAnswer, where: { userId: applicantId } }
      ]
    });

    const applicant = await User.findOne({
      attributes: ['email', 'name', 'profileImage','phone','flag'],
      where: { userId: applicantId }
    });

    const applicantInfo = await Applicant.findOne({
      attributes : ['role','isAccepted'],
      where : {projectId, userId: applicantId}
    })

    applicant.role = applicantInfo.role;
    applicant.isAccepted = applicantInfo.isAccepted;

    if(applicant.flag == 0){
      applicant.phone = null;
    }

    const portfolioQuery =
      'SELECT p.portfolioId, p.title, p.useStack, p.myRole, p.thumbnailImage, p.attachFile FROM portfolio as p, applicantPortfolio as a WHERE a.projectId=:projectId AND a.userId=:userId AND a.portfolioId=p.portfolioId';
    const portfolios = await sequelize.query(portfolioQuery, {
      replacements: { projectId, userId: applicantId }
    });

    await Applicant.update({ seenFlag: 1 }, { where: { userId: applicantId } });

    res.json({
      project: projectAndInterview,
      applicant,
      portfolios: portfolios[0]
    });
  } catch (error) {
    throw Error(error);
  }
};

export const getProjectCart = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;

    const cartQuery =
      'SELECT c.projectId, c.title, p.role FROM projectCart as c, project as p WHERE c.userId=:userId AND c.projectId=p.projectId';
    const carts = await sequelize.query(cartQuery, {
      replacements: { userId }
    });

    res.json({ cart: carts[0] });
  } catch (error) {
    throw Error(error);
  }
};

export const getApplicantStatus = async (req, res) => {
  try {
    const {
      user: { userId }
    } = req;

    const statusQuery =
      'SELECT p.projectId, p.title, p.role, p.isClosed, a.seenFlag, a.isAccepted FROM project as p, applicant as a WHERE a.userId=:userId AND a.projectId=p.projectId order by p.isClosed ASC';
    let status = await sequelize.query(statusQuery, {
      replacements: { userId }
    });
    status = status[0];

    let seenFlagCnt = 0;
    let acceptedCnt = 0;
    for (const row of status) {
      if (row.seenFlag) {
        seenFlagCnt += 1;
      }
      if (row.isAccepted) {
        acceptedCnt += 1;
      }
    }

    res.json({
      applicantCnt: status.length,
      seenCnt: seenFlagCnt,
      acceptedCnt,
      list: status
    });
  } catch (error) {
    throw Error(error);
  }
};

export const acceptApplicant = async (req, res) => {
  try {
    const {
      body: { applicantId },
      params: { projectId }
    } = req;

    await Applicant.update(
      { isAccepted: 1 },
      { where: { userId: applicantId, projectId } }
    );
    res.status(200).json({ message: 'success' });
  } catch (error) {
    throw Error(error);
  }
};

export const cancelApplicant = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { projectId }
    } = req;

    await Applicant.destroy({
      where: { projectId, userId }
    });

    await InterviewAnswer.destroy({
      where: { projectId, userId }
    });

    res.status(200).json({ message: 'success' });
  } catch (error) {
    throw Error(error);
  }
};
