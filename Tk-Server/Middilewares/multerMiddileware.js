// Importing the multer library for handling file uploads
const multer = require('multer');

// Configuration for storing uploaded files
const storage = multer.diskStorage({
    // Setting the destination directory where files will be stored
    destination: (req, file, callback) => {
        callback(null, './uploads'); // Callback function with the destination path
    },
    // Setting the filename for the uploaded file
    filename: (req, file, callback) => {
        // Generating a unique filename using the current date and the original filename
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename); // Callback function with the generated filename
    }
});

// Function to filter which files are accepted based on their MIME type
const fileFilter = (req, file, callback) => {
    console.log("Inside the multer");

    // Checking if the file MIME type is one of the allowed types (png, jpg, jpeg)
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        // If the file type is allowed, calling the callback with true
        callback(null, true);
    } else {
        // If the file type is not allowed, calling the callback with false and an error message
        callback(null, false);
        return callback(new Error("Only PNG, JPG, JPEG files are allowed"));
    }
};

// Configuring multer with the storage and file filter settings
const multerConfig = multer({ storage, fileFilter });

// Exporting the multer configuration to make it available for use in other modules
module.exports = multerConfig;
