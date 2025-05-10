const mongoose = require('mongoose');

const adBannerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: 'Advertisement Banner'
  },
  position: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdBanner', adBannerSchema); 