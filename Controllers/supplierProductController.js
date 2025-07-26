import { Product } from "../Models/Product.js";

// Get all products or products for logged-in supplier
export const getSupplierProducts = async (req, res) => {
  try {
    let products;
    
    // If user is a supplier, get their products
    if (req.user && req.user.role === 'supplier') {
      products = await Product.find({ supplierId: req.user.id });
    } else {
      // If no supplier context or user is not a supplier, get all products
      products = await Product.find({}).populate('supplierId', 'name');
    }
    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Add new product
export const addSupplierProduct = async (req, res) => {
  try {
    const { name, category, price, unit, stock, description } = req.body;
    const product = new Product({
      supplierId: req.user.id,
      name,
      category,
      price,
      unit,
      stock,
      description
    });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Update product
export const updateSupplierProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, supplierId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product
export const deleteSupplierProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, supplierId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
