const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureURLSchema = new Schema({
  url: String,
  name: String,
});

module.exports = mongoose.model('PictureURL', pictureURLSchema);
