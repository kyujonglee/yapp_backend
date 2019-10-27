import passport from 'passport';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const endpoint = new aws.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const s3 = new aws.S3({
  accessKeyId: process.env.NCLOUD_KEY,
  secretAccessKey: process.env.NCLOUD_PRIVATE_KEY,
  region,
  endpoint
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'yapp-backend/avatar'
  })
});

export const uploadAvatar = multerAvatar.single('avatar');

export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    throw Error('only public');
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw Error('user not found');
  }
};
