const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = replySchema;
