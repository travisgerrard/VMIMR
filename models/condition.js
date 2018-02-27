const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionSchema = new Schema({
  tags: [{ type: String }],
  condition: String,
  dateCreated: Date,
  dateUpdated: Date,
  _learnings: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'conditionLearnings' }
  ],
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('conditions', conditionSchema);
