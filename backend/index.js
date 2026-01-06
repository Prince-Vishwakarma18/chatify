import express from "express";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// DEPLOYMENT

if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendPath));

    app.get(/.*/,(req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Chatify is running ");
    });
}

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
