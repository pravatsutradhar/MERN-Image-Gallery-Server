// backend/models/Image.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  secure_url: { type: String },
  width: Number,
  height: Number,
  format: String,
  original_filename: String,
  folder: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", ImageSchema);
