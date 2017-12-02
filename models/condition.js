const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionSchema = new Schema({
  catagoryTag: [{ type: String }],
  name: String,
  selected: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      isSelected: Boolean
    }
  ],
  post: [
    {
      _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      preceptor: String,
      date: String,
      whatWasLearned: String,
      postHidden: Boolean
    }
  ],
  hidden: Boolean,
  dateCreated: Date,
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('conditions', conditionSchema);
