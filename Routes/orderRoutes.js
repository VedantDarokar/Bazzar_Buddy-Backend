import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { placeOrder, getOrders, getOrderById, rateOrder } from "../Controllers/orderController.js";

const router = express.Router();

// place new order
router.post("/", authMiddleware, placeOrder);

// get all orders for user
router.get("/", authMiddleware, getOrders);

// get single order details
router.get("/:id", authMiddleware, getOrderById);

// rating
router.put("/:id/rate", authMiddleware, rateOrder);

export default router;
