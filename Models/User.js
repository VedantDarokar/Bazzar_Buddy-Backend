import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ["vendor", "supplier"], required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
