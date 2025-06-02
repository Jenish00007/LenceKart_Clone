const { Shape } = require('../Models/Shape');

// Get all shapes
exports.getAllShapes = async (req, res) => {
    try {
        const shapes = await Shape.find({ isActive: true });
        res.status(200).json(shapes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shapes', error: error.message });
    }
};

// Get shape by ID
exports.getShapeById = async (req, res) => {
    try {
        const shape = await Shape.findById(req.params.id);
        if (!shape) {
            return res.status(404).json({ message: 'Shape not found' });
        }
        res.status(200).json(shape);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shape', error: error.message });
    }
};

// Create new shape
exports.createShape = async (req, res) => {
    try {
        const { name, imageUrl, caption } = req.body;
        const shape = new Shape({
            name,
            imageUrl,
            caption
        });
        const savedShape = await shape.save();
        res.status(201).json(savedShape);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shape', error: error.message });
    }
};

// Update shape
exports.updateShape = async (req, res) => {
    try {
        const { name, imageUrl, caption, isActive } = req.body;
        const updatedShape = await Shape.findByIdAndUpdate(
            req.params.id,
            { name, imageUrl, caption, isActive },
            { new: true, runValidators: true }
        );
        if (!updatedShape) {
            return res.status(404).json({ message: 'Shape not found' });
        }
        res.status(200).json(updatedShape);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shape', error: error.message });
    }
};

// Delete shape (soft delete)
exports.deleteShape = async (req, res) => {
    try {
        const shape = await Shape.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!shape) {
            return res.status(404).json({ message: 'Shape not found' });
        }
        res.status(200).json({ message: 'Shape deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shape', error: error.message });
    }
}; 