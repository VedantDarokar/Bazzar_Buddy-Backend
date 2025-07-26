import express from "express";
import { getSuppliers, getSupplierProducts } from "../Controllers/supplierController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Vendor can fetch suppliers, so protected or not depending on your choice
router.get("/", authMiddleware, getSuppliers);
router.get("/:id/products", authMiddleware, getSupplierProducts);

export default router;
