// Importing the jsonwebtoken library for JWT (JSON Web Tokens) functionality
const jwt = require('jsonwebtoken');

// Middleware function for JWT authentication
const jwtMiddleware = (req, res, next) => {
    // Logging that the middleware is being executed
    console.log('Inside the JWT middleware');
    
    // Logging the request headers
    console.log(req.headers);

    // Extracting the token from the Authorization header
    const token = req.headers['authorization'].split(" ")[1];

    try {
        // Verifying the token using the secret key
        const jwtResponse = jwt.verify(token, "supersecretkey12345");
        
        // Logging the decoded JWT payload
        console.log(jwtResponse);

        // Adding the decoded user ID from the JWT payload to the request object
        req.payload = jwtResponse.userId;

        // Passing control to the next middleware or route handler
        next();
    } catch (err) {
        // Handling errors if token verification fails
        console.log(err);
        
        // Sending a 401 Unauthorized status along with an error message
        res.status(401).json("Authorization failed!!! Please Login....");
    }
};

// Exporting the JWT middleware function to make it available for use in other modules
module.exports = jwtMiddleware;
