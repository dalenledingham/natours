const AppError = require('../utils/appError');

const devError = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // B) RENDERED WEBSITE
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        message: err.message,
    });
};

const prodError = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // B) Programming or other unknown error: don't leak error details
        // Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }

    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            message: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        message: 'Please try again later.',
    });
};

const handleDBCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired. Please log in again.', 401);

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devError(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let errCopy = Object.assign(err);

        // Handles invalid ids
        if (errCopy.name === 'CastError') errCopy = handleDBCastError(errCopy);
        // Handles duplicate fields
        if (errCopy.code === 11000) errCopy = handleDuplicateFields(errCopy);
        // Handles mongoose validation errors
        if (errCopy.name === 'ValidationError')
            errCopy = handleValidationError(errCopy);
        // Handles jwt errors
        if (errCopy.name === 'JsonWebTokenError') errCopy = handleJWTError();
        if (errCopy.name === 'TokenExpiredError')
            errCopy = handleJWTExpiredError();

        prodError(errCopy, req, res);
    }
};
