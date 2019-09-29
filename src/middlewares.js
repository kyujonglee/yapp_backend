export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    console.log('authenticateJwt', user);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
