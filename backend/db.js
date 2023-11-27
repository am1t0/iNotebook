const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI,{});
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = connectToMongo;