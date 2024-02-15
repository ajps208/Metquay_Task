const admins=require('../Model/adminSchema')
const jwt=require('jsonwebtoken')

exports.login = async (req, res) => {
    console.log("inside Adminlogin function");
    const { email, password } = req.body; // Destructuring email and password from request body
    console.log(req.body);

    try {
        // Finding an existing admin with the provided email and password
        const existingAdmin = await admins.findOne({ email, password });

        if (existingAdmin) {
            // If an existing admin is found, generate a JWT token
            const token = jwt.sign({ adminId: existingAdmin._id }, "supersecretkey12345");

            // Respond with status 200 and send the existing admin data and token
            res.status(200).json({
                existingAdmin,
                token
            });
        } else {
            // If no admin found with the provided credentials, respond with status 404
            res.status(404).json("Incorrect Email / Password");
        }
    } catch (error) {
        // Catch and handle any errors that occur during the process
        console.log(error);
        res.status(401).json(`Login API failed: ${error}`); // Respond with status 401 and error message
    }
};
