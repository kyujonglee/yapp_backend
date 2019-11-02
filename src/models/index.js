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
import RoleModel from './role';
import ProjectRecruitRoleModel from './projectRecruitRole';
import ApplicantPortfolioModel from './applicantPortfolio';

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
export const Role = RoleModel(sequelize, Sequelize);
export const ProjectRecruitRole = ProjectRecruitRoleModel(sequelize, Sequelize);
export const ApplicantPortfolio = ApplicantPortfolioModel(sequelize, Sequelize);

const connectOneToMany = (Many, one, foreignKey) => {
  Many.hasMany(one, {
    foreignKey: { name: foreignKey, allowNull: false }
  });
  one.belongsTo(Many, {
    foreignKey: { name: foreignKey, allowNull: false }
  });
};

const connectOneToOne = (one, target, foreignKey) => {
  one.belongsTo(target, {
    foreignKey: { name: foreignKey, allowNull: false }
  });
};

connectOneToMany(User, Portfolio, 'userId');
connectOneToMany(User, Project, 'userId');
connectOneToMany(User, Project, 'userId');
connectOneToMany(Project, ProjectCart, 'projectId');
connectOneToMany(User, InterviewAnswer, 'userId');
connectOneToMany(Project, InterviewAnswer, 'projectId');
connectOneToMany(Project, ProjectKeyword, 'projectId');
connectOneToMany(Keyword, ProjectKeyword, 'keywordId');
connectOneToMany(Project, InterviewQuestion, 'projectId');
connectOneToMany(Project, ProjectRecruitRole, 'projectId');
connectOneToMany(Role, ProjectRecruitRole, 'roleId');
connectOneToMany(User, Applicant, 'userId');
connectOneToMany(Project, Applicant, 'projectId');
connectOneToOne(Applicant, Role, 'roleId');
connectOneToMany(Project, ApplicantPortfolio, 'projectId');
connectOneToMany(User, ApplicantPortfolio, 'userId');
connectOneToMany(Portfolio, ApplicantPortfolio, 'portfolioId');
