const mongoose = require('mongoose');
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: String,
  generalInfo: String,
  rotationTag: String,
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Provider', providerSchema);
