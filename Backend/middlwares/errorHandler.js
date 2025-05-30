// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errorCode = err.code || 'INTERNAL_SERVER_ERROR';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorCode = 'VALIDATION_ERROR';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
        errorCode = 'INVALID_ID';
    } else if (err.code === 11000) {
        statusCode = 409;
        message = 'Duplicate entry';
        errorCode = 'DUPLICATE_ENTRY';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message: message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

// Not found middleware
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    errorHandler,
    notFound
}; 