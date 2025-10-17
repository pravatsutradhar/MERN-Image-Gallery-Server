import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();


// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5713"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.get("/", (req, res) => {
    res.send("API is running...");
});


// Routes



// Start the server on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
