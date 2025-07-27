// Load .env at top
import { config } from "dotenv";
config({ path: ".env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";
import cartRouter from "./Routes/cartRouters.js";
import orderRouter from "./Routes/orderRoutes.js";
import supplierRouter from "./Routes/supplierRoutes.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS config for both dev & prod
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://platform-for-food-vendors.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/orders", authMiddleware, orderRouter);
app.use("/api/suppliers", supplierRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Bazzar_Buddy"
  })
  .then(() => console.log("✅ MongoDB Connected..!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
