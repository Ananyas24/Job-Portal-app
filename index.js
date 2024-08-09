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
  
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions));




const PORT = process.env.PORT || 3000;



//api's
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);





app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})

app.timeout = 30000; // Set the timeout to 30 seconds
