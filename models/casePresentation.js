const mongoose = require('mongoose');

const { Schema } = mongoose;

const casePresentationSchema = new Schema({
  _presentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  presentationType: { type: String, default: 'general' },
  presentationDate: String,
  hpi: String,
  ros: String,
  pmh: String,
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
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'multipleChoiceQuestionSchema',
    },
  ],
  title: String,
  embedPresentationSting: String,
  slideTextForSearch: String,
  tags: [{ type: String }],
});

module.exports = mongoose.model('CasePresentation', casePresentationSchema);
