// routes/uploadRoutes.js
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/signature", (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // include upload_preset in the signature
    const paramsToSign = {
      timestamp,
      upload_preset: "club-app", // must match Cloudinary preset
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      uploadPreset: "club-app", // must match
    });
  } catch (err) {
    console.error("Signature generation error:", err.message);
    res.status(500).json({ error: "Signature generation failed" });
  }
});

export default router;
