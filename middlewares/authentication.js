const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      id: user.id,
      iat: timestamp,
      admin: user.admin,
      name: user.name,
      eastgate: user.eastgate,
    },
    keys.tokenKey,
  );
}

exports.signin = function(req, res, next) {
  //Well this took forever, but at last signintime is logged without resetting password...
  User.findOne({ _id: req.user.id }, function(err, user, data) {
    if (err) res.send(err);
    User.update(
      user,
      {
        $set: {
          lastSignInTime: Date.now(),
        },
      },
      function(err, numAffected, raw) {
        if (err) console.log(err);
        console.log('updated ' + JSON.stringify(numAffected));
      },
    );
  });
  // User has already had their email and password auth'd
  // We just need to give them a token
  // Passport returns the req.user
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a uer with email does NOT exist, create and save user
    const user = new User({
      email: email,
      password: password,
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicated the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
