const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Condition = mongoose.model('conditions');

module.exports = app => {
  app.get('/api/conditions', requireAuth, function(req, res) {
    console.log(req.user);
    res.send({ message: 'This is the Conditions message' });
  });
};
