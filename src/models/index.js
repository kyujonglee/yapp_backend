import path from 'path';
import Sequelize from 'sequelize';
import UserModel from './user';
import PortfolieModel from './portfolio';
import ProjectModel from './project';
import ProjectCartModel from './projectCart';
import InterviewAnswerModel from './interviewAnswer';
import ApplicantModel from './applicant';
import KeywordModel from './keyword';
import ProjectKeywordModel from './projectKeyword';
import InterviewQuestionModel from './interviewQuestion';
import ApplicantPortfolioModel from './applicantPortfolio';
import ProjectQnaModel from './projectQna';

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '../', 'config', 'config.js'))[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const User = UserModel(sequelize, Sequelize);
export const Portfolio = PortfolieModel(sequelize, Sequelize);
export const Project = ProjectModel(sequelize, Sequelize);
export const ProjectCart = ProjectCartModel(sequelize, Sequelize);
export const InterviewAnswer = InterviewAnswerModel(sequelize, Sequelize);
export const Applicant = ApplicantModel(sequelize, Sequelize);
export const Keyword = KeywordModel(sequelize, Sequelize);
export const ProjectKeyword = ProjectKeywordModel(sequelize, Sequelize);
export const InterviewQuestion = InterviewQuestionModel(sequelize, Sequelize);
export const ApplicantPortfolio = ApplicantPortfolioModel(sequelize, Sequelize);
export const ProjectQna = ProjectQnaModel(sequelize, Sequelize);

const connectOneToMany = (Many, one, foreignKey) => {
  Many.hasMany(one, {
    foreignKey: { name: foreignKey, allowNull: false }
  });
  one.belongsTo(Many, {
    foreignKey: { name: foreignKey, allowNull: false }
  });
};

connectOneToMany(User, Portfolio, 'userId');
connectOneToMany(User, Project, 'userId');
connectOneToMany(User, Project, 'userId');
connectOneToMany(Project, ProjectCart, 'projectId');
connectOneToMany(User, ProjectCart, 'userId');
connectOneToMany(User, InterviewAnswer, 'userId');
connectOneToMany(Project, InterviewAnswer, 'projectId');
connectOneToMany(Project, ProjectKeyword, 'projectId');
connectOneToMany(Keyword, ProjectKeyword, 'keywordId');
connectOneToMany(Project, InterviewQuestion, 'projectId');
connectOneToMany(User, Applicant, 'userId');
connectOneToMany(Project, Applicant, 'projectId');
connectOneToMany(Project, ApplicantPortfolio, 'projectId');
connectOneToMany(User, ApplicantPortfolio, 'userId');
connectOneToMany(Portfolio, ApplicantPortfolio, 'portfolioId');
connectOneToMany(User, ProjectQna, 'userId');
connectOneToMany(Project, ProjectQna, 'projectId');

ProjectQna.hasMany(ProjectQna, { as: 'answer', foreignKey: 'parentId' });
