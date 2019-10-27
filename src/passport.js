import dotenv from 'dotenv';

dotenv.config();
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from './models';

const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await User.findOne({ where: { userId: payload.id } });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new JWTStrategy(jwtOptions, verifyUser));
