// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch((err) => console.log("Database connection error:", err));

// Mount Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Mount Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Portfolio API is running cleanly!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});