const nodemailer = require('nodemailer');
const { User, validate } = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const JWT_SECRET = process.env.SECRET_TOKEN

// Creating new User
exports.registerUser = async (req, res) => {
    try {

        const { userName, email, password } = req.body

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ userName: userName, email: email, password: hashPassword });

        const verificationToken = jwt.sign({ email }, 'Email_Token', { expiresIn: '1h' });
        newUser.verificationToken = verificationToken;

        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        });

        const mailOptions = {
            from: 'random@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `<a href="http://localhost:5000/api/auth/verify/${verificationToken}"> Click here to verify your email </a>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json("User created successfully")
    } catch (error) {
        res.status(500).send("Some Error Occured")
    }
}

// Verifying users token
exports.verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        // Verify the token
        const decoded = jwt.verify(token, 'Email_Token');

        if (!decoded || !decoded.email) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user verification status in the database
        const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { $set: { isVerified: true, verificationToken: null } }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch {
        res.status(500).send("Some Error Occured")
    }
}

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(402).json("User with these email doesn't exist")
        }

        if (!user.isVerified) {
            return res.status(400).json("Email not verified")
        }

        const checkPassword = bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(404).send("Invalid Credential")
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        res.status(200).send({ authToken })

    } catch (error) {
        res.status(500).send("Some Error Occured")
    }
}