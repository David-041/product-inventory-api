// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGN UP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully!", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ error: "Failed to sign up user" });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare submitted password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create a JWT token that expires in 1 hour
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1h' });

        res.json({ message: "Logged in successfully!", token });
    } catch (err) {
        res.status(500).json({ error: "Failed to log in" });
    }
});

module.exports = router;