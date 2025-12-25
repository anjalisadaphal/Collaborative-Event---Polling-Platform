const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

console.log('--- MongoDB Connection Test ---');
console.log(`Attempting to connect with URI length: ${uri ? uri.length : 'undefined'}`);
// Mask password for logging
const maskedUri = uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'undefined';
console.log(`URI: ${maskedUri}`);

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('SUCCESS: MongoDB Connected!');
        process.exit(0);
    } catch (error) {
        console.error('FAILURE: Connection failed.');
        console.error(`Error Name: ${error.name}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Code: ${error.code}`);
        console.error(`Error CodeName: ${error.codeName}`);
        process.exit(1);
    }
};

connectDB();
