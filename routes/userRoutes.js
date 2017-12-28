const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/users/', requireAuth, async (req, res) => {
    try {
      const usersArray = await User.find({});
      var userObjects = {};
      usersArray.forEach(function(user) {
        userObjects[user._id] = user;
      });
      res.send(userObjects);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
