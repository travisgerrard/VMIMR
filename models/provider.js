const mongoose = require('mongoose');
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: String,
  generalInfo: String,
  rotationTag: String,
  associatedRotation: { type: mongoose.Schema.Types.ObjectId, ref: 'Rotation' },
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Provider', providerSchema);
