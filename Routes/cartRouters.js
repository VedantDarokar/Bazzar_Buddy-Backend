import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getCart, addCartItem, updateCartItem, deleteCartItem } from "../Controllers/cartController.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addCartItem);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;
