// backend/config/db.js
import mongoose from "mongoose";


export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(uri, { dbName: "mern_gallery" });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
