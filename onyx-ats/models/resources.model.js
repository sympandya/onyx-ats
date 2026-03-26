import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["InterviewPrep", "SalaryData"],
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    qaPairs: [{
        question: String,
        answer: String 
    }],
    salaryRanges: [{
        experienceLevel: String,
        range: String 
    }],
    imageUrl: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export const Resource = mongoose.model("Resource", resourceSchema);