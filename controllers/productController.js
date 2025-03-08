const Product = require("../models/product");

// Get All Products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Single Product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Create New Product (Admin only)
const createProduct = async (req, res) => {
  const { name, price, description, image, stock } = req.body;

  const product = new Product({ name, price, description, image, stock });
  await product.save();

  res.status(201).json({ message: "Product created successfully", product });
};

// Update Product (Admin only)
const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Product updated successfully", updatedProduct });
};

// Delete Product (Admin only)
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
