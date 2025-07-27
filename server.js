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
import productRouter from "./Routes/productRoutes.js";
import supplierOrdersRouter from "./Routes/supplierOrders.js";
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
// ✅ Load environment variables
config({ path: ".env" });

// ✅ Allowed origins for both dev + production
const allowedOrigins = [
  "http://localhost:3000",                                  // local dev
  "https://platform-for-food-vendors.onrender.com",        // deployed frontend (update with your actual client domain)
];

// ✅ CORS config
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS blocked from origin: ${origin}`));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());        // Parse JSON bodies

// ✅ Routes
app.use("/api", authRoutes);    // public routes (register/login)
app.use("/api/cart", authMiddleware, cartRouter);     // protected cart routes
app.use("/api/orders", authMiddleware, orderRouter);  // protected order routes
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/supplierOrders", supplierOrdersRouter);

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
