import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    appliedResumeLink: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String
    },
    matchScore: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["Pending", "Interviewing", "Shortlisted", "Rejected"],
        required: true,
        default: "Pending"
    },
    rejectionReason: {
        type: String
    },
    privateNotes: {
        type: String
    },
    interviewDate: {
        type: String
    },
    interviewTime: {
        type: String
    },
    interviewLink: {
        type: String
    },
    emailSent: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const Application = mongoose.model("Application", applicationSchema);