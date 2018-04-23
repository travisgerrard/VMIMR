const mongoose = require('mongoose');
const { Schema } = mongoose;

const eastgateSchema = new Schema({
  sectionTitle: String,
  sectionContent: String,
  sectionIndex: Number,
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Eastgate', eastgateSchema);
