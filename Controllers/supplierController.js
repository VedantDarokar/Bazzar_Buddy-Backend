// In your controller
import {User} from "../Models/User.js";
import { Product } from "../Models/Product.js";

// GET /api/suppliers
export const getSuppliers = async (req, res) => {
  try {
    // get all users with role = supplier
    const suppliers = await User.find({ role: "supplier" }).select("name location verified rating categories");
    res.json(suppliers);
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
