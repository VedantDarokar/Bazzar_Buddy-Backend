import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  category: String,
  price: Number,
  unit: String,
  stock: Number,
  description: String,
});

export const Product = mongoose.model("Product", productSchema);
