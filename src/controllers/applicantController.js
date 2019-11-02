import message from '../message';
import {
  Applicant,
  User,
  ApplicantPortfolio,
  sequelize,
  InterviewAnswer
} from '../models';

export const enrollApplicant = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      params: { projectId },
      user: { userId },
      body: { role, portfolios, answers }
    } = req;
    const user = await User.findOne({ where: { userId } });
    const { name, profileImage } = user;
    const applicant = await Applicant.findOne({ where: { userId, projectId } });
    if (!applicant) {
      await Applicant.create(
        {
          projectId: parseInt(projectId, 10),
          userId,
          name,
          profileImage,
          role
        },
        { transaction }
      );
      let applicantPortfolios;
      if (portfolios && portfolios.length) {
        applicantPortfolios = portfolios.map(portfolioId => ({
          projectId,
          userId,
          portfolioId
        }));
      }
      let applicantAnswers;
      if (answers && answers.length) {
        applicantAnswers = answers.map(answer => ({
          projectId,
          userId,
          sn: answer.sn,
          content: answer.content
        }));
      }
      await ApplicantPortfolio.bulkCreate(applicantPortfolios, { transaction });
      await InterviewAnswer.bulkCreate(applicantAnswers, { transaction });
      await transaction.commit();
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw Error(message.failApplicant);
  }
};
