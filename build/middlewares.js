"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJwt = exports.uploadAvatar = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var endpoint = new _awsSdk["default"].Endpoint('https://kr.object.ncloudstorage.com');
var region = 'kr-standard';
var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.NCLOUD_KEY,
  secretAccessKey: process.env.NCLOUD_PRIVATE_KEY,
  region: region,
  endpoint: endpoint
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: 'yapp-backend/avatar'
  })
});
var uploadAvatar = multerAvatar.single('avatar');
exports.uploadAvatar = uploadAvatar;

var authenticateJwt = function authenticateJwt(req, res, next) {
  return _passport["default"].authenticate('jwt', {
    sessions: false
  }, function (error, user) {
    try {
      if (user) {
        req.user = user;
      }

      next();
    } catch (err) {
      res.status(400).json({
        error: err
      });
    }
  })(req, res, next);
};

exports.authenticateJwt = authenticateJwt;