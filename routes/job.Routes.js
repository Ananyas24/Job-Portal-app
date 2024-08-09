import express from "express";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
// router.post('/register', registerUser);
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjob").get(isAuthenticated, getAdminJob);
router.route("/get/:id").get(isAuthenticated, getJobById);





// Route to register a new user

export default router;