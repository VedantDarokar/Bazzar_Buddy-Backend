import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productName: String,
  supplierName: String,
  price: Number,
  quantity: Number,
  unit: String,
  maxStock: Number
});

export const CartItem = mongoose.model("CartItem", cartItemSchema);
