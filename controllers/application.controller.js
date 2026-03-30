import { z } from "zod";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { sendEmail } from "../config/email.util.js";
import { User } from "../models/user.model.js";

const calculateScore = (candidateSkillsArray, requiredSkillsArray) => {
    
    if (requiredSkillsArray.length === 0) return 100;

    const candidateSkills = candidateSkillsArray.map(skill => skill.trim().toLowerCase());
    const requiredSkills = requiredSkillsArray.map(skill => skill.trim().toLowerCase());

    const matchingSkills = candidateSkills.filter(element => requiredSkills.includes(element));
    
    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
}

const applicationSchema = z.object({
    appliedResumeLink: z.url(),
    coverLetter: z.url()
}).partial();

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
            
            const userDoc = await User.findById(req.user._id).select("defaultResumeLink skills");
            const jobDoc = await Job.findById(req.params.jobId).select("requiredSkills");

            if (!jobDoc) return res.status(404).json({msg: "Job not found"});

            const candidateSkillsArray = userDoc.skills || []; 
            const requiredSkillsArray = jobDoc.requiredSkills || [];
            const defaultResumeLink = userDoc.defaultResumeLink;

            const matchScore = calculateScore(candidateSkillsArray, requiredSkillsArray);

            if(appliedResumeLink){
                await Application.create({
                    candidateId: req.user._id,
                    matchScore: matchScore,
                    jobId: req.params.jobId,
                    appliedResumeLink: appliedResumeLink,
                    coverLetter: coverLetter,
                });
                console.log("Application made with custom resume...");
                return res.status(201).json({msg: "Application successfull..."});
            }
            else{
                if(!defaultResumeLink) return res.status(400).json({msg: "Please add default resume in profile before applying!!!"});
                await Application.create({
                    candidateId: req.user._id,
                    matchScore: matchScore,
                    jobId: req.params.jobId,
                    appliedResumeLink: defaultResumeLink,
                    coverLetter: coverLetter,
                });
                console.log("Application made with default resume...");
                return res.status(201).json({msg: "Application successfull..."});
            }
        }
        catch(e){
            return res.status(500).json({
            msg: "Something went wrong!!!", errorName: e.name,});
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
        }, {status: status}, {returnDocument: 'after', runValidators: true})
        .populate("candidateId", "name email")
        .populate({
            path: "jobId",
            select: "title recruiterId",
            populate: {
                path: "recruiterId",
                select: "companyName"
            }
        });
        
        if(updatedApplication == null) return res.status(404).json({msg: "Application not found!!!"});
        let recipientMailId, subject, content;
        
        
        if(status == "Shortlisted"){
            recipientMailId = updatedApplication.candidateId.email;
            subject = `Update on your application for ${updatedApplication.jobId.title} role at ${updatedApplication.jobId.recruiterId.companyName}`;
            content = `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #ffffff;">
                            <h2 style="color: #10b981; margin-top: 0;">Great news, ${updatedApplication.candidateId.name}! 🎉</h2>
                            <p>Thank you for taking the time to apply for the <strong>${updatedApplication.jobId.title}</strong> position at ${updatedApplication.jobId.recruiterId.companyName}.</p>
                            <p>We were incredibly impressed by your background and experience. We are excited to let you know that your application has been <strong>shortlisted</strong> for the next round!</p>
                            <p>Our team will be reaching out to you very soon with details about the interview process and next steps. Keep an eye on your inbox.</p>
                            <br/>
                            <p style="margin-bottom: 0;">Best regards,</p>
                            <p style="margin-top: 5px;"><strong>The ${updatedApplication.jobId.recruiterId.companyName} Team</strong></p>
                        </div>`
        }
        else if(status == "Rejected"){
            recipientMailId = updatedApplication.candidateId.email;
            subject = `Final Update on your application for ${updatedApplication.jobId.title} role at ${updatedApplication.jobId.recruiterId.companyName}`;
            content = `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #ffffff;">
                        <h2 style="color: #4a4a4a; margin-top: 0;">Update on your application</h2>
                        <p>Hi ${updatedApplication.candidateId.name},</p>
                        <p>Thank you for your interest in joining ${updatedApplication.jobId.recruiterId.companyName} and for applying for the <strong>${updatedApplication.jobId.title}</strong> role.</p>
                        <p>We received many strong applications, and while we truly appreciate your skills and background, we have decided to move forward with other candidates whose experience more closely aligns with our current needs for this specific position.</p>
                        <p>We know the job search process can be exhausting, and we deeply value the time you took to share your background with us.</p>
                        <p>We wish you the absolute best in your career journey and future endeavors.</p>
                        <br/>
                        <p style="margin-bottom: 0;">Best regards,</p>
                        <p style="margin-top: 5px;"><strong>The ${updatedApplication.jobId.recruiterId.companyName} Team</strong></p>
                        </div>`
        }

        if (recipientMailId && subject && content) {
            await sendEmail(recipientMailId, subject, content);
        }

        return res.status(200).json({msg: "Status updated successfully..."});
    }
    catch(e){
        return res.status(400).json({
            msg: "Something went wrong!!!",
            errors: e
        });
    }
}