import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import claimRoutes from "./routes/claimRoutes.js"
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/forms", formRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req,res) => {
    res.json({
        message: "Forma AI backend is running!"
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Forma AI server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();