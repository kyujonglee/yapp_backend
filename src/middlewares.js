import passport from 'passport';

export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    try {
      if (user) {
        req.user = user;
      }
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  })(req, res, next);
