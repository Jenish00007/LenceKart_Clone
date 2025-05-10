const mongoose = require('mongoose');

const sectionBannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    leftImage: {
        type: String,
        required: true
    },
    rightImage: {
        type: String,
        required: true
    },
    section: {
        type: String,
        enum: ['top', 'middle', 'bottom'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SectionBanner', sectionBannerSchema); 