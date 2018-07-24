const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionLearningSchema = new Schema(
  {
    tags: [{ type: String }],
    usersTagged: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    whatWasLearned: String,
    dateField: String,
    seenWith: String,
    dateCreated: Date,
    dateUpdated: Date,
    dotPhrase: { type: Boolean, default: false },
    _condition: { type: mongoose.Schema.Types.ObjectId, ref: 'Condition' },
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { usePushEach: true },
);

module.exports = mongoose.model('conditionLearnings', conditionLearningSchema);
