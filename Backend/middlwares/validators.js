const { body, param, query, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }
    next();
};

// Product validation rules
const productValidation = {
    create: [
        body('name').notEmpty().trim().withMessage('Product name is required'),
        body('price').isNumeric().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('productType').isIn([
            "EYEGLASSES",
            "SUNGLASSES",
            "CONTACT_LENSES",
            "COMPUTER_BLU_LENSES",
            "ZERO_POWER_COMPUTER_BLU",
            "COLOR_CONTACT_LENSES",
            "CONTACT_LENS_SOLUTION",
            "CONTACT_LENS_CASES",
            "CONTACT_LENS_ACCESSORIES",
            "CONTACT_LENS_REMOVERS",
            "CONTACT_LENS_WASHING_SOLUTION",
            "CONTACT_LENS_MOISTURIZERS",
            "CONTACT_LENS_CLEANING_KITS",
            "SUNGLASSES_WITH_POWER",
            "EYEGLASSES_WITH_POWER"
        ]).withMessage('Invalid product type'),
        validate
    ],
    update: [
        param('id').isMongoId().withMessage('Invalid product ID'),
        body('price').optional().isNumeric().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        validate
    ],
    getById: [
        param('id').isMongoId().withMessage('Invalid product ID'),
        validate
    ]
};

// User validation rules
const userValidation = {
    register: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
        body('first_name').notEmpty().trim().withMessage('First name is required'),
        body('last_name').notEmpty().trim().withMessage('Last name is required'),
        validate
    ],
    login: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
        validate
    ]
};

// Order validation rules
const orderValidation = {
    create: [
        body('items').isArray().withMessage('Items must be an array'),
        body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
        body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        body('shippingAddress').isObject().withMessage('Shipping address is required'),
        validate
    ]
};

module.exports = {
    productValidation,
    userValidation,
    orderValidation
}; 