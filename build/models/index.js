"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicantPortfolio = exports.ProjectRecruitRole = exports.Role = exports.InterviewQuestion = exports.ProjectKeyword = exports.Keyword = exports.Applicant = exports.InterviewAnswer = exports.ProjectCart = exports.Project = exports.Portfolio = exports.User = exports.sequelize = void 0;

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _user = _interopRequireDefault(require("./user"));

var _portfolio = _interopRequireDefault(require("./portfolio"));

var _project = _interopRequireDefault(require("./project"));

var _projectCart = _interopRequireDefault(require("./projectCart"));

var _interviewAnswer = _interopRequireDefault(require("./interviewAnswer"));

var _applicant = _interopRequireDefault(require("./applicant"));

var _keyword = _interopRequireDefault(require("./keyword"));

var _projectKeyword = _interopRequireDefault(require("./projectKeyword"));

var _interviewQuestion = _interopRequireDefault(require("./interviewQuestion"));

var _role = _interopRequireDefault(require("./role"));

var _projectRecruitRole = _interopRequireDefault(require("./projectRecruitRole"));

var _applicantPortfolio = _interopRequireDefault(require("./applicantPortfolio"));

var env = process.env.NODE_ENV || 'development';

var config = require(_path["default"].join(__dirname, '../', 'config', 'config.js'))[env];

var sequelize = new _sequelize["default"](config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var User = (0, _user["default"])(sequelize, _sequelize["default"]);
exports.User = User;
var Portfolio = (0, _portfolio["default"])(sequelize, _sequelize["default"]);
exports.Portfolio = Portfolio;
var Project = (0, _project["default"])(sequelize, _sequelize["default"]);
exports.Project = Project;
var ProjectCart = (0, _projectCart["default"])(sequelize, _sequelize["default"]);
exports.ProjectCart = ProjectCart;
var InterviewAnswer = (0, _interviewAnswer["default"])(sequelize, _sequelize["default"]);
exports.InterviewAnswer = InterviewAnswer;
var Applicant = (0, _applicant["default"])(sequelize, _sequelize["default"]);
exports.Applicant = Applicant;
var Keyword = (0, _keyword["default"])(sequelize, _sequelize["default"]);
exports.Keyword = Keyword;
var ProjectKeyword = (0, _projectKeyword["default"])(sequelize, _sequelize["default"]);
exports.ProjectKeyword = ProjectKeyword;
var InterviewQuestion = (0, _interviewQuestion["default"])(sequelize, _sequelize["default"]);
exports.InterviewQuestion = InterviewQuestion;
var Role = (0, _role["default"])(sequelize, _sequelize["default"]);
exports.Role = Role;
var ProjectRecruitRole = (0, _projectRecruitRole["default"])(sequelize, _sequelize["default"]);
exports.ProjectRecruitRole = ProjectRecruitRole;
var ApplicantPortfolio = (0, _applicantPortfolio["default"])(sequelize, _sequelize["default"]);
exports.ApplicantPortfolio = ApplicantPortfolio;

var connectOneToMany = function connectOneToMany(Many, one, foreignKey) {
  Many.hasMany(one, {
    foreignKey: {
      name: foreignKey,
      allowNull: false
    }
  });
  one.belongsTo(Many, {
    foreignKey: {
      name: foreignKey,
      allowNull: false
    }
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
connectOneToMany(Project, ApplicantPortfolio, 'projectId');
connectOneToMany(User, ApplicantPortfolio, 'userId');
connectOneToMany(Portfolio, ApplicantPortfolio, 'portfolioId'); // User.hasMany(Portfolio, { foreignKey: { name: 'userId', allowNull: false } });
// Portfolio.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });
// User.hasMany(Project, { foreignKey: { name: 'writerId', allowNull: false } });
// Project.belongsTo(User, { foreignKey: { name: 'writerId', allowNull: false } });
// User.hasMany(ProjectCart, { foreignKey: { name: 'userId', allowNull: false } });
// ProjectCart.belongsTo(User, {
//   foreignKey: { name: 'userId', allowNull: false }
// });
// Project.hasMany(ProjectCart, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// ProjectCart.belongsTo(Project, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// User.hasMany(InterviewAnswer, {
//   foreignKey: { name: 'userId', allowNull: false }
// });
// InterviewAnswer.belongsTo(User, {
//   foreignKey: { name: 'userId', allowNull: false }
// });
// Project.hasMany(InterviewAnswer, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// InterviewAnswer.belongsTo(Project, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// Project.hasMany(ProjectKeyword, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// ProjectKeyword.belongsTo(Project, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// Keyword.hasMany(ProjectKeyword, {
//   foreignKey: { name: 'keywordId', allowNull: false }
// });
// ProjectKeyword.belongsTo(Keyword, {
//   foreignKey: { name: 'keywordId', allowNull: false }
// });
// Project.hasMany(InterviewQuestion, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// InterviewQuestion.belongsTo(Project, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// Project.hasMany(ProjectRecruitRole, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });
// ProjectRecruitRole.belongsTo(Project, {
//   foreignKey: { name: 'projectId', allowNull: false }
// });