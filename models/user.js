const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  name: { type: String, unique: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true, lowercase: true },
  phoneNumber: { type: String, unique: true },
  password: String,
  creationTime: Date,
  lastSignInTime: Date,
  admin: { type: Boolean, default: false }
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
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
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('users', userSchema);

// Export the model
module.exports = ModelClass;
