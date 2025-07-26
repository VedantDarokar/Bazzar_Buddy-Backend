import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";
import cartRouter from "./Routes/cartRouters.js";
import orderRouter from "./Routes/orderRoutes.js";
import supplierRouter from "./Routes/supplierRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import supplierOrdersRouter from "./Routes/supplierOrders.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Load environment variables
config({ path: ".env" });

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend dev server
  credentials: true
}));                // Allow cross-origin requests
app.use(express.json());        // Parse JSON bodies

// ✅ Routes
app.use("/api", authRoutes);    // public routes (register/login)
app.use("/api/cart", authMiddleware, cartRouter);     // protected cart routes
app.use("/api/orders", authMiddleware, orderRouter); // protected order routes
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/supplierOrders", supplierOrdersRouter);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Bazzar_Buddy",
  })
  .then(() => console.log("✅ MongoDB Connected..!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
