const mongoose = require('mongoose');
const { Shape } = require('../Models/Shape');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const shapes = [
    {
        name: "Round",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Round.png",
        caption: "Round Shape",
        description: "A classic round shape ideal for square and heart face types."
    },
    {
        name: "Square",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Square.png",
        caption: "Square Shape",
        description: "Square frames are great for round and oval faces."
    },
    {
        name: "Rectangle",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png",
        caption: "Rectangle Shape",
        description: "Rectangle frames suit round and oval faces well."
    },
    {
        name: "Aviator",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Aviator.png",
        caption: "Aviator Shape",
        description: "Aviator frames provide a bold look for most face shapes."
    },
    {
        name: "Cat Eye",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/CatEye.png",
        caption: "Cat Eye Shape",
        description: "Cat eye frames are ideal for oval and square face types."
    },
    {
        name: "Oval",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Hexagonal.png",
        caption: "Oval Shape",
        description: "Oval frames are a universal fit for most face types."
    },
    {
        name: "Geometric",
        imageUrl: "https://static.lenskart.com/images/cust_mailer/Eyeglass/Geometric.png",
        caption: "Geometric Shape",
        description: "Modern and trendy geometric shapes for bold styles."
    }
];

// Add displayOrder dynamically based on index
shapes.forEach((shape, index) => {
    shape.displayOrder = index + 1;
});

const seedShapes = async () => {
    try {
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
