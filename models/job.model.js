import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "contract", "freelance"],
        required: true
    },
    workMode: {
        type: String,
        enum: ["remote", "on-site", "hybrid"],
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ["entry-level", "intermediate", "senior", "executive"],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    requiredSkills: [{
        type: String, 
        lowercase: true
    }],
    status: {
        type: String, 
        enum: ["Open", "Closed"],
        required: true,
        default: "open"
    },
    isActive: {
        type: Boolean, default: true 
    }
}, {timestamps: true})

export const Job = mongoose.model("Job", jobSchema);