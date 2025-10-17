// backend/routes/signature.js
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/**
 * Return timestamp and signature for client-side signed upload.
 * We also sign folder to avoid mismatch if client sends folder param.
 */
router.get("/", (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    // enforce folder if configured
    const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || req.query.folder || "";

    // Build params that client will send to Cloudinary and that we sign.
    // IMPORTANT: the object keys and values must match exactly what the client will send.
    const paramsToSign = folder ? { timestamp, folder } : { timestamp };

    // cloudinary.utils.api_sign_request accepts (params_to_sign, api_secret)
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    res.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: folder || undefined
    });
  } catch (err) {
    console.error("Signature error:", err);
    res.status(500).json({ message: "Signature generation error" });
  }
});

export default router;
