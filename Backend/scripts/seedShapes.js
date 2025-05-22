const mongoose = require('mongoose');
const { Shape } = require('../Models/Shape');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const shapes = [
    {
        name: "Round",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Round.png",
        caption: "Round Shape"
    },
    {
        name: "Square",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Square.png",
        caption: "Square Shape"
    },
    {
        name: "Rectangle",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png",
        caption: "Rectangle Shape"
    },
    {
        name: "Aviator",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Aviator.png",
        caption: "Aviator Shape"
    },
    {
        name: "Cat Eye",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/CatEye.png",
        caption: "Cat Eye Shape"
    },
    {
        name: "Oval",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Hexagonal.png",
        caption: "Oval Shape"
    },
    {
        name: "Geometric",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Geometric.png",
        caption: "Geometric Shape"
    }
];

const seedShapes = async () => {
    try {
        // Log the MongoDB URI to verify it's loaded
        console.log('MongoDB URI:', process.env.MONGO_URI);
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Delete existing shapes
        await Shape.deleteMany({});
        console.log('Deleted existing shapes');

        // Insert new shapes
        const createdShapes = await Shape.insertMany(shapes);
        console.log('Inserted shapes:', createdShapes);

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding shapes:', error);
        process.exit(1);
    }
};

seedShapes(); 