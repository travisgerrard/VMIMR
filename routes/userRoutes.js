const mongoose = require('mongoose');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const bcrypt = require('bcrypt-nodejs');

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

  app.post('/api/users/', requireAuth, async (req, res, next) => {
    const { name, username, email, admin, id } = req.body;
    const password = username;

    console.log(id);
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists
    User.findOne({ _id: id }, async (err, existingUser) => {
      if (err) {
        return next(err);
      }

      // If a user with email does exist, return an error
      if (existingUser) {
        var userToUpdate = await User.findOneAndUpdate(
          {
            _id: id
          },
          {
            $set: {
              name,
              username,
              email,
              admin
            }
          },
          { new: true }
        );
        await userToUpdate.save();
        res.send(userToUpdate);
      }

      // If a uer with email does NOT exist, create and save user
      const user = new User({
        name,
        username,
        email,
        admin,
        password
      });

      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return next(err);
        }

        // hash {encrypt} our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) {
            return next(err);
          }

          // overwrite plan text password with encypted password
          user.password = hash;
          //next();
        });
      });

      console.log(`User1: ${user}`);

      await user.save(function(err) {
        if (err) {
          return next(err);
        }
      });
      console.log(`User2: ${user}`);

      res.send(user);
    });
  });

  app.post(
    '/api/registerPushNotifications',
    requireAuth,
    async (req, res, next) => {
      console.log(req.body);
      const { token } = req.body;
      console.log(token);
      User.findOne({ _id: req.user.id }, async (err, existingUser) => {
        if (err) {
          return next(err);
        }

        if (existingUser) {
          var userToUpdate = await User.findOneAndUpdate(
            {
              _id: req.user.id
            },
            {
              $set: {
                pushToken: token
              }
            },
            { new: true }
          );
          await userToUpdate.save();
          res.send(userToUpdate);
        }
      });
    }
  );
};
