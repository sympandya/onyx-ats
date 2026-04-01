import { User } from "../models/user.model.js";
import z from "zod";

const userProfileSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.email("Invalid email format"),
    skills: z.string().lowercase(),
    bio: z.string(),
    defaultResumeLink: z.url()
}).partial();

export const candidateProfileUpdate = async (req, res)=>{
    const parseResults = userProfileSchema.safeParse(req.body);

    if(!parseResults.success) return res.status(400).json({msg: "Validation failed!!!", errors: parseResults.error});

    const { name, email, skills, bio, defaultResumeLink } = parseResults.data;
    const userId = req.user._id;

    let updateData = {};

    if(name) updateData.name = name;
    if(email) updateData.email = email;
    if(skills){
        updateData.skills = skills.split(",").map(s => s.trim()).filter(s => s !== "");
    }
    if(bio) updateData.bio = bio;
    if(defaultResumeLink) updateData.defaultResumeLink = defaultResumeLink;

    try{
        await User.findOneAndUpdate({_id: userId}, updateData, {new: true});

        return res.status(200).json({msg: "Profile updated successfully..."});
    }
    catch(e){
        return res.status(500).json({msg: "Something went wrong will updating the profile!!!", errors: e})
    }
}

const recruiterSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.email("Invalid email format"),
    companyName: z.string().min(2,"Company name must be atleast 2 characters long"),
    companyDescription: z.string(),
    companyIndustry: z.string(),
    companyLogoUrl: z.url()
}).partial();

export const recruiterProfileUpdate = async (req, res)=>{
    const parseResults = recruiterSchema.safeParse(req.body);

    if(!parseResults.success) return res.status(400).json({msg: "Validation failed!!!"});
    const { name, email, companyName, companyDescription, companyIndustry, companyLogoUrl } = parseResults.data;
    const userId = req.user._id;

    let updateData = {}

    if(name) updateData.name = name;
    if(email) updateData.email = email;
    if(companyName) updateData.companyName = companyName;
    if(companyDescription) updateData.companyDescription = companyDescription;
    if(companyIndustry) updateData.companyIndustry = companyIndustry;
    if(companyLogoUrl) updateData.companyLogoUrl = companyLogoUrl;

    try{
        await User.findOneAndUpdate({_id: userId}, updateData, {new: true});

        return res.status(200).json({msg: "Profile updated successfully..."});
    }
    catch(e){
        return res.status(500).json({msg: "Something went wrong will updating the profile!!!", errors: e})
    }
}

export const getUserProfile = async (req, res)=>{
    try{
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({user});
    }
    catch(e){
        return res.status(500).json({msg: "Something went wrong!!!", errors: e});
    }
}