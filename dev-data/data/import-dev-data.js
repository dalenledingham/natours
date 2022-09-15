const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

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

// Database functions ==========================================================
// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Import data to database
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
    } catch (err) {
        return console.log(err.message);
    }
    process.exit();
};

// Delete all data from database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
    } catch (err) {
        return console.log(err.message);
    }
    process.exit();
};

// Script options ==============================================================
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    resetDatabase();
}
