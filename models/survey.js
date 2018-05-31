const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  _surveyTaker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  valueOne: String,
  valueTwo: String,
  valueThree: String,
  valueFour: String,
  dateCreated: Date,
});

module.exports = mongoose.model('Survey', surveySchema);
