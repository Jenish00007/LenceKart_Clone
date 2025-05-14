const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            "SINGLE_VISION",
            "BIFOCAL",
            "PROGRESSIVE",
            "READING",
            "CONTACT_LENS",
            "ZERO_POWER"
        ]
    },
    range: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        step: {
            type: Number,
            default: 0.25
        }
    },
    additionalFeatures: [{
        type: String,
        enum: [
            "Anti Glare",
            "Blue Light Block",
            "Photochromic",
            "High Index",
            "UV Protection"
        ]
    }],
    description: {
        type: String,
        required: true
    },
    recommendedFor: [{
        type: String,
        enum: [
            "Reading",
            "Computer Work",
            "Driving",
            "Sports",
            "Daily Wear",
            "Night Vision"
        ]
    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
powerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Power = mongoose.model('Power', powerSchema);

// Sample power data
const defaultPowers = [
    {
        name: "Single Vision - Standard",
        type: "SINGLE_VISION",
        range: {
            min: -6.00,
            max: +6.00,
            step: 0.25
        },
        additionalFeatures: ["Anti Glare", "UV Protection"],
        description: "Standard single vision lenses for distance or near vision correction",
        recommendedFor: ["Daily Wear", "Computer Work"],
        price: 1500
    },
    {
        name: "Single Vision - High Index",
        type: "SINGLE_VISION",
        range: {
            min: -8.00,
            max: +8.00,
            step: 0.25
        },
        additionalFeatures: ["Anti Glare", "UV Protection", "High Index"],
        description: "Thin and light high-index lenses for strong prescriptions",
        recommendedFor: ["Daily Wear"],
        price: 3000
    },
    {
        name: "Bifocal",
        type: "BIFOCAL",
        range: {
            min: -4.00,
            max: +4.00,
            step: 0.25
        },
        additionalFeatures: ["Anti Glare", "UV Protection"],
        description: "Bifocal lenses with distinct viewing zones for near and far vision",
        recommendedFor: ["Reading", "Daily Wear"],
        price: 2500
    },
    {
        name: "Progressive",
        type: "PROGRESSIVE",
        range: {
            min: -6.00,
            max: +6.00,
            step: 0.25
        },
        additionalFeatures: ["Anti Glare", "UV Protection"],
        description: "No-line multifocal lenses with smooth transition between viewing zones",
        recommendedFor: ["Daily Wear", "Reading", "Computer Work"],
        price: 4500
    },
    {
        name: "Computer Blue Light",
        type: "SINGLE_VISION",
        range: {
            min: 0,
            max: 0,
            step: 0
        },
        additionalFeatures: ["Blue Light Block", "Anti Glare"],
        description: "Zero power lenses with blue light protection for digital screen use",
        recommendedFor: ["Computer Work"],
        price: 2000
    },
    {
        name: "Reading Glasses",
        type: "READING",
        range: {
            min: +1.00,
            max: +3.50,
            step: 0.25
        },
        additionalFeatures: ["Anti Glare"],
        description: "Specialized lenses for comfortable reading",
        recommendedFor: ["Reading"],
        price: 1000
    },
    {
        name: "Contact Lens - Monthly",
        type: "CONTACT_LENS",
        range: {
            min: -10.00,
            max: +6.00,
            step: 0.25
        },
        additionalFeatures: ["UV Protection"],
        description: "Monthly disposable contact lenses",
        recommendedFor: ["Daily Wear", "Sports"],
        price: 1200
    }
];

// Function to initialize powers
const initializePowers = async () => {
    try {
        // Check if powers already exist
        const count = await Power.countDocuments();
        if (count === 0) {
            // Insert default powers
            await Power.insertMany(defaultPowers);
            console.log('Default powers initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing powers:', error);
    }
};

module.exports = {
    Power,
    initializePowers
}; 