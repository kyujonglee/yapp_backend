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

const env = process.env.NODE_ENV || 'development';
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

User.hasMany(Portfolio, { foreignKey: { name: 'userId', allowNull: false } });
Portfolio.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

User.hasMany(Project, { foreignKey: { name: 'writerId', allowNull: false } });
Project.belongsTo(User, { foreignKey: { name: 'writerId', allowNull: false } });

User.hasMany(ProjectCart, { foreignKey: { name: 'userId', allowNull: false } });
ProjectCart.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false }
});

Project.hasMany(ProjectCart, {
  foreignKey: { name: 'projectId', allowNull: false }
});
ProjectCart.belongsTo(Project, {
  foreignKey: { name: 'projectId', allowNull: false }
});

User.hasMany(InterviewAnswer, {
  foreignKey: { name: 'userId', allowNull: false }
});
InterviewAnswer.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false }
});

Project.hasMany(InterviewAnswer, {
  foreignKey: { name: 'projectId', allowNull: false }
});
InterviewAnswer.belongsTo(Project, {
  foreignKey: { name: 'projectId', allowNull: false }
});

Project.hasMany(ProjectKeyword, {
  foreignKey: { name: 'userId', allowNull: false }
});
ProjectKeyword.belongsTo(Project, {
  foreignKey: { name: 'userId', allowNull: false }
});

Keyword.hasMany(ProjectKeyword, {
  foreignKey: { name: 'keywordId', allowNull: false }
});
ProjectKeyword.belongsTo(Keyword, {
  foreignKey: { name: 'keywordId', allowNull: false }
});

Project.hasMany(InterviewQuestion, {
  foreignKey: { name: 'projectId', allowNull: false }
});
InterviewQuestion.belongsTo(Project, {
  foreignKey: { name: 'projectId', allowNull: false }
});
