// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import signatureRoutes from "./routes/signature.js";
import imagesRoutes from "./routes/images.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"]
}));
app.use(express.json({ limit: "10mb" })); // we only accept metadata and small JSON
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => res.send("MERN Cloudinary backend"));

app.use("/api/signature", signatureRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
