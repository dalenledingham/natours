const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Database connection =========================================================
// Connect to Atlas hosted database
const DB_HOSTED = process.env.DATABASE_HOSTED.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB_HOSTED).then(() => {});

// Connect to local database
// const DB_LOCAL = process.env.DATABASE_LOCAL;
// mongoose.connect(DB_LOCAL).then(() => {});

// Require app and listen on port ==============================================
const app = require('./app');

const port = process.env.PORT || 8000;
const server = app.listen(port);

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION');
    console.log(err);
    server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION');
    console.log(err);
    server.close(() => process.exit(1));
});
