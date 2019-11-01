const HOME = '/';
const HELLO = '/hello';
const JOIN = '/join';
const LOGIN = '/login';
const SEARCH = '/search';

const AUTH = '/auth';
const GET_TOKEN = '/getToken';
const CHECK_EMAIL = '/check-email';

const USER = '/user';
const PORTFOLIOS = '/portfolios'

const API = '/api';

const PROJECTS = '/projects';
const PROJECT_ID = '/:projectId';

const MYPAGE = '/mypage';
const SUPPORTS = '/supports';
const KEYWORDS = '/keywords';
const KEYWORD_ID = '/:keywordId';

const routes = {
  home: HOME,
  hello: HELLO,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  auth: AUTH,
  getToken: GET_TOKEN,
  api: API,
  projects: PROJECTS,
  projectId: PROJECT_ID,
  mypage: MYPAGE,
  supports: SUPPORTS,
  keywords: KEYWORDS,
  keywordId: KEYWORD_ID,
  checkEmail: CHECK_EMAIL,
  user: USER,
  portfolios: PORTFOLIOS
};

export default routes;
