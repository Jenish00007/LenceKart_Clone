const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            "Round",
            "Square", 
            "Rectangle",
            "Aviator",
            "Cat Eye",
            "Oval",
            "Geometric",
            "Wayfarer",
            "Clubmaster",
            "Butterfly",
            "Wrap",
            "Sports"
        ],
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    faceTypes: [{
        type: String,
        enum: [
            "Round Face",
            "Oval Face",
            "Square Face",
            "Heart Face",
            "Diamond Face",
            "Triangle Face"
        ]
    }],
    popularity: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        required: true
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

// Update the updatedAt timestamp before saving
shapeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Shape = mongoose.model('Shape', shapeSchema);

// Function to initialize shapes
const initializeShapes = async () => {
    try {
        // Check if shapes already exist
        const count = await Shape.countDocuments();
        if (count === 0) {
            // Insert default shapes
          
            console.log('Default shapes initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing shapes:', error);
    }
};

module.exports = {
    Shape,
    initializeShapes
}; 