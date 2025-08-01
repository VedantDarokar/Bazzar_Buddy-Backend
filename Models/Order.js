import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productName: String,
      supplierName: String,
      supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      price: Number,
      quantity: Number,
      unit: String,
      status: {
        type: String,
        enum: ["pending", "cancelled", "delivered"],
        default: "pending",
      },
    },
  ],
  isGroupOrder: Boolean,
  deliveryDate: Date,
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected", "delivered"],
    default: "pending",
  },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
