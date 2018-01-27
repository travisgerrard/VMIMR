const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  name: { type: String, unique: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true, lowercase: true },
  phoneNumber: { type: String, unique: true },
  pushToken: String,
  password: String,
  creationTime: Date,
  lastSignInTime: Date,
  admin: { type: Boolean, default: false }
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
