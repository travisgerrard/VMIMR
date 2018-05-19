const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
  postTitle: String,
  postContents: String,
  postDate: String,
  likes: Number,
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Form', formSchema);
