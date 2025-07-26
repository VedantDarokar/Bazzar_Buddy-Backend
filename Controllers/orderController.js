import { Order } from "../Models/Order.js";
import { CartItem } from "../Models/CartItem.js";
import { Product } from "../Models/Product.js";

/**
 * Place an order
 * Body: { items: [], isGroupOrder: Boolean, deliveryDate: String }
 * Requires: req.user (from authMiddleware)
 */
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, isGroupOrder, deliveryDate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!deliveryDate) {
      return res.status(400).json({ message: "Delivery date is required" });
    }

    // For each item, look up the product and set supplierId
    const itemsWithSupplier = await Promise.all(items.map(async (item) => {
      const product = await Product.findOne({ name: item.productName });
      if (!product) throw new Error(`Product not found: ${item.productName}`);
      return {
        ...item,
        supplierId: product.supplierId,
        supplierName: product.supplierName || item.supplierName || "",
      };
    }));

    // Create new order
    const order = new Order({
      userId,
      items: itemsWithSupplier,
      isGroupOrder: Boolean(isGroupOrder),
      deliveryDate: new Date(deliveryDate),
    });

    await order.save();

    // Optional: clear cart after placing order
    await CartItem.deleteMany({ userId });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.error("placeOrder error:", err);
    res.status(500).json({ message: err.message || "Failed to place order" });
  }
};

/**
 * Get all orders for logged-in user
 */
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * (Optional) Get single order details
 */
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
};

export const rateOrder = async (req, res) => {
  try {
    const { rating } = req.body;
    const orderId = req.params.id;
    const userId = req.user.id;

    // Ensure the order belongs to this vendor
    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      { rating },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order rated successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to rate order" });
  }
};
