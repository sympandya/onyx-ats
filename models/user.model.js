import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "candidate", "recruiter"],
        required: true
    },
    skills: [{
        type: String, 
        lowercase: true, 
        required: true
    }],
    bio: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }], 
    defaultResumeLink: String,
    companyName: String,
    companyIndustry: String,
    companyDescription: String,
    companyLogoUrl: String
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);