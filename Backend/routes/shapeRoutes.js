const express = require('express');
const router = express.Router();
const shapeController = require('../controllers/shapeController');

// Get all shapes
router.get('/', shapeController.getAllShapes);

// Shape management routes
router.get('/:id', shapeController.getShapeById);
router.post('/', shapeController.createShape);
router.put('/:id', shapeController.updateShape);
router.delete('/:id', shapeController.deleteShape);

module.exports = router; 