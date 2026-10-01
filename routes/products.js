// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// POST a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create({
            name: req.body.name,
            price: req.body.price
        });
        res.status(201).json({ message: "Product created!", product: newProduct });
    } catch (err) {
        res.status(400).json({ error: "Failed to create product" });
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Invalid product ID" });
    }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, price: req.body.price },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product updated!", product: updatedProduct });
    } catch (err) {
        res.status(400).json({ error: "Failed to update product" });
    }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

module.exports = router;