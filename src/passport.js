import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from './models';
const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  console.log('payload : ', payload);
  try {
    const user = await User.findOne({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new JWTStrategy(jwtOptions, verifyUser));

passport.initialize();
