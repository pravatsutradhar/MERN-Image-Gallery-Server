// backend/routes/images.js
import express from "express";
import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Save image metadata (called by frontend after successful Cloudinary upload)
router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.public_id || !payload.secure_url) {
      return res.status(400).json({ message: "Invalid cloudinary response" });
    }

    // upsert protect: if public_id exists, skip duplicate error
    const existing = await Image.findOne({ public_id: payload.public_id });
    if (existing) return res.json(existing);

    const image = new Image({
      public_id: payload.public_id,
      url: payload.url || payload.secure_url,
      secure_url: payload.secure_url,
      width: payload.width,
      height: payload.height,
      format: payload.format,
      original_filename: payload.original_filename,
      folder: payload.folder,
    });

    await image.save();
    res.json(image);
  } catch (err) {
    console.error("Save image error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }).limit(200);
    res.json(images);
  } catch (err) {
    console.error("Fetch images error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Delete image (by DB id)
router.delete("/:id", async (req, res) => {
  try {
    const imageDoc = await Image.findById(req.params.id);
    if (!imageDoc) return res.status(404).json({ message: "Not found" });

    const result = await cloudinary.uploader.destroy(imageDoc.public_id);
    // result.result may be "ok" or "not found"
    if (result.result && !["ok", "not found"].includes(result.result)) {
      return res.status(400).json({ message: "Cloudinary deletion failed", result });
    }

    await imageDoc.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
