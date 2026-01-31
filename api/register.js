import { connectDB } from "./db.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();
    console.log("Connected to DB");

    const newUser = new User(req.body);
    await newUser.save();
    console.log("User saved:", newUser);

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
}
