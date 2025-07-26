import { CartItem } from "../Models/CartItem.js";

// ✅ Get all cart items for the logged-in user
export const getCart = async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    console.error("getCart error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// ✅ Add an item to cart
export const addCartItem = async (req, res) => {
  try {
    const { productName, supplierName, price, quantity, unit, maxStock } = req.body;
    const userId = req.user.id;

    // Check if this product already exists in cart
    const existingItem = await CartItem.findOne({ userId, productName, supplierName });
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Cart item updated", item: existingItem });
    }

    const newItem = new CartItem({
      userId,
      productName,
      supplierName,
      price,
      quantity,
      unit,
      maxStock
    });

    await newItem.save();
    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (err) {
    console.error("addCartItem error:", err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

// ✅ Update quantity of an item
export const updateCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;
    const userId = req.user.id;

    const item = await CartItem.findOne({ _id: itemId, userId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await item.save();

    res.json({ message: "Cart item updated", item });
  } catch (err) {
    console.error("updateCartItem error:", err);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};

// ✅ Remove item from cart
export const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    const deleted = await CartItem.findOneAndDelete({ _id: itemId, userId });
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("deleteCartItem error:", err);
    res.status(500).json({ message: "Failed to delete cart item" });
  }
};
