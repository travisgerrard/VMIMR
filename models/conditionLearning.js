const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionLearningSchema = new Schema({
  tags: [{ type: String }],
  whatWasLearned: String,
  dateField: String,
  seenWith: String,
  dateCreated: Date,
  dateUpdated: Date,
  _condition: { type: mongoose.Schema.Types.ObjectId, ref: 'Condition' },
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('conditionLearnings', conditionLearningSchema);
