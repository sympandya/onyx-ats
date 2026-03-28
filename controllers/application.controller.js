import { z } from "zod";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

const applicationSchema = z.object({
    appliedResumeLink: z.url(),
    coverLetter: z.url()
})

// Apply for a Job
export const applyJob = async (req, res)=>{
    const parseResults = applicationSchema.safeParse(req.body);

    if(parseResults.success){
        try{
            const { appliedResumeLink, coverLetter } = parseResults.data;
            const doesApplicationExist = await Application.findOne({
                candidateId: req.user._id,
                jobId: req.params.jobId
            });
            if(doesApplicationExist) return res.status(409).json({msg: "You have already applied for this role!!!"});
            else{
                await Application.create({
                    candidateId: req.user._id,
                    jobId: req.params.jobId,
                    appliedResumeLink: appliedResumeLink,
                    coverLetter: coverLetter,
                });
                return res.status(201).json({msg: "Application successfull..."});
            }
        }
        catch(e){
            return res.status(400).json({msg: "Something went wrong!!!", errors: e});
        }
    }
    else{
        return res.status(400).json({msg: "Validation failed!!!", errors: parseResults.error});
    }
}

// Get applicants by jobId
export const getApplicants = async (req, res)=>{
    try{
        const jobFound = await Job.findOne({_id: req.params.jobId, recruiterId: req.user._id});
        if(!jobFound) return res.status(404).json({msg: "Job not found!!!"});

        const applications = await Application.find({jobId: req.params.jobId}).populate("candidateId", "-password");

        if(!applications) return res.status(400).json("Something went wrong");
        if(applications.length == 0) return res.status(200).json({msg: "No applications yet!!!"});

        return res.status(200).json({
            applications: applications
        });
    }
    catch(e){
        return res.status(400).json({msg: "Something went wrong!!!", errors: e});
    }
}


// Update status
export const updateStatus = async (req, res)=>{
    try{
        const status = req.body.status;
        if(typeof status !== 'string' || !status){
            return res.status(400).json({msg: "Status is not valid or empty!!!"});
        }
        const updatedApplication = await Application.findOneAndUpdate({
            _id: req.params.applicationId
        }, {status: status}, {returnDocument: 'after', runValidators: true});

        if(updatedApplication == null) return res.status(404).json({msg: "Application not found!!!"});

        return res.status(200).json({msg: "Status updated successfully..."});
    }
    catch(e){
        return res.status(400).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}