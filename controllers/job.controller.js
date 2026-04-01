import z from "zod"
import { Job } from "../models/job.model.js"
import { User } from "../models/user.model.js";
import { JobQA } from "../models/jobQA.model.js";

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

    let searchQuery = {
        status: "Open",
        isActive: true
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    if(req.query.keyword) searchQuery.title = { $regex: req.query.keyword, $options: 'i' };
    if(req.query.jobType) searchQuery.jobType = req.query.jobType;
    if(req.query.workMode) searchQuery.workMode = req.query.workMode;
    if(req.query.experienceLevel) searchQuery.experienceLevel = req.query.experienceLevel;
    if(req.query.location) searchQuery.location = { $regex: req.query.location, $options: 'i' };

    try{
        const totalJobs = await Job.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalJobs / limit);

        const jobs = await Job.find(searchQuery).populate("recruiterId", "companyName companyLogoUrl -_id").sort({ createdAt: -1 }).skip(skip).limit(limit);
        return res.status(200).json({
            jobs, totalJobs, page, totalPages
        });
    }
    catch(e){
        return res.status(500).json({
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
        return res.status(500).json({
            msg: "Something went wrong!!!",
            errors: e.message
        });
    }
}

// Get all job (by recruiter)
export const getMyJobs = async (req, res) => {
    try {
        const myJobs = await Job.find({ recruiterId: req.user._id }).sort({ createdAt: -1 });

        if(myJobs.length === 0) {
            return res.status(200).json({ jobs: [], msg: "You haven't posted any jobs yet." });
        }

        return res.status(200).json({ jobs: myJobs });
    } 
    catch (e) {
        return res.status(500).json({ msg: "Failed to fetch your jobs!!!", errors: e.message });
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


// Get all saved jobs
export const getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "savedJobs", 
            populate: {
                path: "recruiterId",
                select: "companyName companyLogoUrl"
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ savedJobs: user.savedJobs || [] });
    } catch (e) {
        return res.status(500).json({ msg: "Failed to fetch saved jobs", errors: e.message });
    }
}


//Ask a question
export const askQuestion = async (req, res)=>{
    const jobId = req.params.jobId;
    if(!jobId) return res.status(400).json({msg: "JobId not provided!!!"});
    const questionText = req.body.questionText;
    if(!questionText) return res.status(400).json({msg: "Question not provided!!!"});

    try{
        await JobQA.create({
            jobId: jobId,
            askerId: req.user._id,
            questionText: questionText
        });
        return res.status(201).json({msg: "Question posted succesfully!!!"});
    }
    catch(e){
        return res.status(500).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}

//Answer a question
export const answerAQuestion = async (req, res)=>{
    const jobId = req.params.jobId;
    if(!jobId) return res.status(400).json({msg: "JobId not provided!!!"});
    const questionId = req.params.questionId;
    const answerText = req.body.answerText;
    if(!answerText) return res.status(400).json({msg: "Answer not provided!!!"});

    try{
        const validRecruiter = await Job.findOne({_id: jobId, recruiterId: req.user._id});
        if (!validRecruiter) return res.status(403).json({msg: "You are not authorised for this operation!!!"});
        await JobQA.findOneAndUpdate({_id: questionId}, {answerText: answerText, isAnswered: true}, {new: true});
        return res.status(201).json({msg: "Answer posted succesfully!!!"});
    }
    catch(e){
        return res.status(500).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}

// Get a Job's QnA
export const getJobQnA = async (req, res)=>{
    const jobId = req.params.jobId;
    if(!jobId) return res.status(400).json({msg: "Job id not valid!!!"});
    
    try{
        const jobQnA = await JobQA.find({
            jobId: jobId, isActive: true
        }).populate("askerId", "name").sort({createdAt: -1});
        if(jobQnA.length == 0) return res.status(200).json({msg: "No questions asked yet!!!"});
        return res.status(200).json({jobQnA: jobQnA});
    }
    catch(e){
        return res.status(500).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}