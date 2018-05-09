const mongoose = require('mongoose');
const { Schema } = mongoose;

const rotationSchema = new Schema({
  title: String,
  generalInfo: String,
  dbname: String,
  providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }],
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Rotation', rotationSchema);
