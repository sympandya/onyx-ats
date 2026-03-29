import z from "zod"
import { Job } from "../models/job.model.js"
import { User } from "../models/user.model.js";

const postJobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobType: z.enum(["full-time", "part-time", "contract", "freelance"]),
    numOfOpenings: z.number().positive(),
    workMode: z.enum(["remote", "on-site", "hybrid"]),
    experienceLevel: z.enum(["entry-level", "intermediate", "senior", "executive"]),
    location: z.string().min(3, "Location must be at least 3 characters"),
    salary: z.string(),
    requiredSkills: z.array(z.string().lowercase()),
});

// Post a new Job
export const postJob = async(req, res)=>{
    const parseResults = postJobSchema.safeParse(req.body);

    if(parseResults.success){
        const { title, description, jobType, numOfOpenings, workMode, experienceLevel, 
            location, salary, requiredSkills } = parseResults.data;
        try{
            await Job.create({
                recruiterId: req.user._id,
                title: title,
                description: description,
                jobType: jobType,
                numOfOpenings: numOfOpenings,
                workMode: workMode,
                experienceLevel: experienceLevel,
                location: location,
                salary: salary,
                requiredSkills: requiredSkills
            }); 
            return res.status(201).json({
                msg: "Job created successfully..."
            });
        }
        catch(e){
            return res.status(400).json({msg: "Something went wrong!!!", errors: e});
        }
    }
    else{
        return res.status(400).json({msg: "Validation failed!!!", errors: parseResults.error});
    }
}

// Get all Jobs
export const getAllJobs = async (req, res)=>{
    try{
        const jobs = await Job.find({
            status: "Open",
            isActive: true
        }).populate("recruiterId", "companyName companyLogoUrl -_id");
        return res.status(200).json({
            jobs: jobs
        });
    }
    catch(e){
        return res.status(400).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}


// Get job by Id
export const getJobById = async (req, res)=>{
    const { jobId } = req.params;
    try{
        const foundJob = await Job.findById(jobId).populate("recruiterId", "companyName companyLogoUrl -_id");
        if(!foundJob) return res.status(404).json({msg: "Job not found!!!"});

        return res.status(200).json({foundJob: foundJob});
    }
    catch(e){
        return res.status(400).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}


// Save a Job
export const saveJob = async(req, res)=>{
    const userId = req.user._id;
    const jobId = req.params.jobId;

    try{
        const foundJob = await Job.findById(jobId);
        if(!foundJob) return res.status(404).json({msg: "Job not found"});

        const user = await User.findById(userId);

        const isJobSaved = user.savedJobs.some(id => id.toString() === jobId);

        if(isJobSaved){
            await User.findByIdAndUpdate(userId, {
                $pull: {savedJobs: jobId}
            });
            return res.status(200).json({msg: "Job removed successfully..."});
        }else{
            await User.findByIdAndUpdate(userId, {
                $addToSet: {savedJobs: jobId}
            });
            return res.status(201).json({msg: "Job added successfully..."});
        }
    }
    catch(e){
        return res.status(400).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}