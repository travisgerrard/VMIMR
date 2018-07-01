const mongoose = require('mongoose');
const { Schema } = mongoose;
const replySchema = require('./reply');

const commentSchema = new Schema({
  subject: String,
  body: String,
  createdAt: Date,
  updatedAt: Date,
  replies: [replySchema],
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Form', formSchema);
