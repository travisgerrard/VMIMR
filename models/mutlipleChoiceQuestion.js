const mongoose = require('mongoose');

const { Schema } = mongoose;

const multipleChoiceQuestionSchema = new Schema({
  title: { type: String },
  options: [{ type: String }],
  answers: [{ type: String }],
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _case: { type: mongoose.Schema.Types.ObjectId, ref: 'CasePresentation' },
});

module.exports = mongoose.model(
  'MulitpleChoiceQuestion',
  multipleChoiceQuestionSchema,
);
