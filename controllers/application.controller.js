import { Application } from "../models/application.model.js";
import { Job } from "../models/job.module.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                status: false
            })
        };
        //check if user already applied to job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                status: false
            })
        };
        //check if  the job exist
        const job = await Job.findById(jobId);
        console.log(job,"job")
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false
            })
        };
        //check if the job is active
        //
        // if (!job) {
        //     return res.status(400).json({
        //         message: "Job is not active",
        //         status: false
        //     })
        // };
        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        res.status(201).json({
            message: "Job applied successfully",
            status: true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No job applied",
                status: false
            })
        };
        res.status(200).json({
            application,
            status: true
        })
    } catch (error) {
        console.log(error);
    }
};
//admin dekhega kitne user ne apply kiya h
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false
            })
        };
        res.status(200).json({
            message: "Applicants found successfully",
            status: true,
            applicants: job.applications
        })
    } catch (error) {
        console.log(error);
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                status: false
            })
        }
        //find the application by applicant id
        const application = await Application.findOne({_id:applicationId});
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        //update the application status
        application.status = status.toLowerCase();
        await application.save();
        res.status(200).json({
            message: "Status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};







