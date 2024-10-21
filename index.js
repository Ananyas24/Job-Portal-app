import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import applicationRoutes from "./routes/application.Routes.js";
import companyRoutes from "./routes/company.Routes.js";
import jobRoutes from "./routes/job.Routes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://job-portal-frontend-x1wb.onrender.com', // Use the deployed frontend URL for production
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

// Optional: Set timeout to 30 seconds
app.timeout = 30000;
