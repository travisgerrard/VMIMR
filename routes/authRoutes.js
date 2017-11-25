const Authentication = require('../middlewares/authentication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/api/', requireAuth, function(req, res) {
    console.log(req.user);
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
};
