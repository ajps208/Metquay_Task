// Importing required modules and user schema
const users = require('../Model/userSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// Creating nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "gcthostelgcthostel789@gmail.com",
    pass: "aivpikwikxkgqmyh"
  },
});

// Function to register a new user
exports.register = async (req, res) => {
    console.log("inside the register controller function");
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(406).json("Account already exists !!!");
        } else {
            // Create a new user
            const newUser = new users({
                username, email, password
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        // Handle registration failure
        res.status(200).json(`Register Api failed, Error ${err}`);
    }
};

// Function to authenticate user login
exports.login = async (req, res) => {
    console.log("inside login function");
    const { email, password } = req.body;
    try {
        // Find user by email and password
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            // Generate JWT token for user authentication
            const token = jwt.sign({ userId: existingUser._id }, "supersecretkey12345");
            res.status(200).json({
                existingUser, token
            });
        } else {
            // Return error if credentials are incorrect
            res.status(404).json("incorrect Email / Password");
        }
    } catch (error) {
        // Handle login failure
        res.status(401).json(`login api failed : ${err}`);
    }
};

// Function to send OTP via email
exports.sendOtp = async (req, res) => {
    console.log("inside the otp mail");
    const { to, subject, html } = req.body;
    const mailOptions = {
        from: 'gcthostelgcthostel789@gmail.com',
        to,
        subject,
        html,
    };
    try {
        // Send email with OTP
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json(info);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        // Handle email sending error
        res.status(401).json('Error sending email:', error);
        console.error('Error sending email:', error);
    }
};

// Function to change user password
exports.changePassword = async (req, res) => {
    console.log("inside change password function");
    const { email, password } = req.body;
    try {
        // Find user by email
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            // Update user password
            await users.findOneAndUpdate(
                { email },
                { $set: { password: password } },
                { new: true }
            );
            console.log("Password updated successfully");
            res.status(200).json("Password updated successfully");
        } else {
            // Return error if user not found
            res.status(404).json("incorrect Email / Password");
        }
    } catch (error) {
        // Handle password change failure
        console.log(error);
        res.status(401).json(`password api failed : ${error}`);
    }
};
