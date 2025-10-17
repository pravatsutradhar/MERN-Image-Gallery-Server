// backend/routes/signature.js
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/**
 * Return timestamp and signature for client-side signed upload.
 * We sign minimal parameters (timestamp). If you need folder, public_id, transformations,
 * include them in the signed params server-side and include them in signature calculation.
 */
router.get("/", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);

  // Optional: you can set other params to be signed, e.g. folder: 'mern_gallery'
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({ timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY });
});

export default router;
