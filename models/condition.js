const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionSchema = new Schema({
  catagoryTag: [{ type: String }],
  condition: String,
  selected: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      isSelected: { type: Boolean, default: false }
    }
  ],
  post: [
    {
      _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      preceptor: String,
      date: String,
      whatWasLearned: String,
      postHidden: { type: Boolean, default: false }
    }
  ],
  hidden: { type: Boolean, default: false },
  dateCreated: Date,
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('conditions', conditionSchema);
