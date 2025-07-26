import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getSupplierOrders, updateOrderStatus } from "../Controllers/supplierOrderController.js";

router.get("/", authMiddleware, getSupplierOrders);
router.put("/:id", authMiddleware, updateOrderStatus);

export default router;