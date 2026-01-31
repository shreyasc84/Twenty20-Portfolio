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

  await connectDB();
  await new User(req.body).save();

  res.status(200).json({ message: "Registration successful" });
}
