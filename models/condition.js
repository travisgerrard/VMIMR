const mongoose = require('mongoose');
const { Schema } = mongoose;

const conditionSchema = new Schema({
  catagory: String,
  name: String,
  selected: [ {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isSelected: Boolean
  }],
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('conditions', conditionSchema);
