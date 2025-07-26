import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getSupplierOrders, updateOrderStatus } from "../Controllers/supplierOrderController.js";

const router = express.Router();

// Test endpoint without auth to verify route is working
router.get("/test", (req, res) => {
  res.json({ message: "Supplier orders route is working!" });
});

router.get("/", authMiddleware, getSupplierOrders);
router.put("/:id", authMiddleware, updateOrderStatus);

export default router;