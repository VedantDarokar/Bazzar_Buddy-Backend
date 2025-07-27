import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getSupplierProducts, addSupplierProduct,updateSupplierProduct,deleteSupplierProduct,searchProducts } from "../Controllers/supplierProductController.js";

const router = express.Router();

// Test endpoint without auth to verify route is working
router.get("/test", (req, res) => {
  res.json({ message: "Products route is working!" });
});

router.get("/", authMiddleware, getSupplierProducts);
router.post("/", authMiddleware, addSupplierProduct);
router.put("/:id", authMiddleware, updateSupplierProduct);
router.delete("/:id", authMiddleware, deleteSupplierProduct);
router.get("/search", authMiddleware, searchProducts);

export default router;