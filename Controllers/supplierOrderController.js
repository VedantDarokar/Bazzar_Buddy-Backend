import { Order } from "../Models/Order.js";

// Get all orders that contain this supplier’s products
export const getSupplierOrders = async (req, res) => {
  try {
    // If each order item has supplier info, filter accordingly
    const orders = await Order.find({ "items.supplierId": req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status (for this supplier’s part of the order)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order" });
  }
};
