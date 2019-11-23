const HOME = '/';
const HELLO = '/hello';
const JOIN = '/join';
const LOGIN = '/login';
const SEARCH = '/search';
const ME = '/me';

const AUTH = '/auth';
const GET_TOKEN = '/getToken';
const CHECK_EMAIL = '/checkEmail';

const USER = '/user';
const PORTFOLIOS = '/portfolios';
const PROFILE = '/profile';

const API = '/api';

const PROJECTS = '/projects';
const PROJECT_ID = '/:projectId';
const QUESTION = '/question';
const POPULARITY = '/popularity';
const VIEW_CNT = '/viewCnt';
const QNA = '/qna';
const CART = '/cart';

const MYPAGE = '/mypage';
const SUPPORTS = '/supports';
const KEYWORDS = '/keywords';
const KEYWORD_ID = '/:keywordId';

const APPLICANTS = '/applicants';

const PORTFOLIO = '/portfolio';
const RECRUIT = '/recruit';
const STATUS = '/status';
const ACCEPT = '/accept';

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
  portfolios: PORTFOLIOS,
  applicants: APPLICANTS,
  portfolio: PORTFOLIO,
  recruit: RECRUIT,
  me: ME,
  profile: PROFILE,
  question: QUESTION,
  popularity: POPULARITY,
  viewCnt: VIEW_CNT,
  qna: QNA,
  cart: CART,
  status: STATUS,
  accept: ACCEPT
};

export default routes;
