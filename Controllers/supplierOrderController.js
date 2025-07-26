import { Order } from "../Models/Order.js";

// Get all supplier orders or orders for logged-in supplier
export const getSupplierOrders = async (req, res) => {
  try {
    let orders;
    
    // If user is a supplier, get their orders
    if (req.user && req.user.role === 'supplier') {
      orders = await Order.find({ "items.supplierId": req.user.id });
    } else {
      // If no supplier context or user is not a supplier, get all supplier orders
      orders = await Order.find({}).populate('items.supplierId', 'name');
    }
    
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
