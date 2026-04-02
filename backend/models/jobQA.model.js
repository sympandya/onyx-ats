import mongoose, { mongo } from "mongoose";

const jobQASchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    askerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    answerText: {
        type: String
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

export const JobQA = mongoose.model("JobQA", jobQASchema);