// Importing the Mongoose library
const mongoose = require('mongoose');

// Getting the MongoDB connection string from environment variables
const connectionString = process.env.DATABASE;

// Connecting to MongoDB using Mongoose
mongoose.connect(connectionString).then(() => {
    // If the connection is successful, log a success message
    console.log("MongoDB Atlas successfully connected with tkserver");
}).catch((err) => {
    // If the connection fails, log an error message
    console.log(`MongoDB connection failed!!! Error: ${err}`);
});
