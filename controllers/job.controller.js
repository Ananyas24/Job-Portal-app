import { Job } from "../models/job.module.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, location, salary, requirements, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !location || !salary || !requirements || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }
        const newJob = await Job.create({
            title,
            description,
            location,
            salary: Number(salary),
            requirements: requirements.split(","),
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        res.status(201).json({
            message: "New Job created successfully",
            job: newJob,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }

            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1});
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }
        res.status(200).json({
            message: "Jobs found successfully",
            success: true,
            jobs
        })
    } catch (error) {

        console.log(error)
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        res.status(200).json({
            message: "Job found successfully",
            success: true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}
    //job created by admin
export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }
        res.status(200).json({
            message: "Jobs found successfully",
            success: true,
            jobs
        })
    } catch (error) {
        console.log(error)
    }
}  