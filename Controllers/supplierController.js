// In your controller
import {User} from "../Models/User.js";
import { Product } from "../Models/Product.js";

// GET /api/suppliers
export const getSuppliers = async (req, res) => {
  try {
    // get all users with role = supplier
    const suppliers = await User.find({ role: "supplier" }).select("name location verified rating");
    // For each supplier, aggregate product info
    const supplierIds = suppliers.map(s => s._id);
    const products = await Product.find({ supplierId: { $in: supplierIds } });
    const supplierStats = {};
    supplierIds.forEach(id => {
      const prods = products.filter(p => p.supplierId.toString() === id.toString());
      supplierStats[id] = {
        totalProducts: prods.length,
        avgPrice: prods.length > 0 ? (prods.reduce((sum, p) => sum + (p.price || 0), 0) / prods.length) : 0,
        categories: [...new Set(prods.map(p => p.category).filter(Boolean))],
      };
    });
    // Compose response
    const result = suppliers.map(s => ({
      _id: s._id,
      name: s.name,
      location: s.location || "",
      verified: s.verified || false,
      rating: s.rating || 0,
      totalProducts: supplierStats[s._id]?.totalProducts || 0,
      avgPrice: supplierStats[s._id]?.avgPrice || 0,
      categories: supplierStats[s._id]?.categories || [],
      deliveryTime: "1-2 Days", // Mocked for now
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
};

// GET /api/suppliers/:id/products
export const getSupplierProducts = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const products = await Product.find({ supplierId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch supplier products" });
  }
};
