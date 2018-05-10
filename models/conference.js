const mongoose = require('mongoose');
const { Schema } = mongoose;

const conferenceSchema = new Schema({
  _presentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hpi: String,
  ros: String,
  meds: [{ type: String }],
  medSurgHx: [{ type: String }],
  Social: [{ type: String }],
  physicalExam: String,
  wbc: String,
  hgb: String,
  plt: String,
  Na: String,
  K: String,
  Cl: String,
  HC02: String,
  BUN: String,
  Cr: String,
  Glu: String,
  AP: String,
  ALT: String,
  AST: String,
  Tbili: String,
  summAssessment: String,
  ddx: [{ type: String }],
  questionOne: { title: String, options: [{type: String}]},
  questionTwo: { title: String, options: [{ type: String }] }
  embedPresentationSting: String,
  slideTextForSearch: String,
});

module.exports = mongoose.model('Conference', conferenceSchema);
