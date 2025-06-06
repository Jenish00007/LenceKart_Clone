const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Banner', bannerSchema);