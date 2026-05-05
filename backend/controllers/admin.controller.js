import { Job } from "../models/job.model.js";
import { JobQA } from "../models/jobQA.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";

export const getStats = async (req, res)=>{
    try{
        const [userCount, jobsCount, applicationCount] = await Promise.all([
            User.countDocuments(), Job.countDocuments(), Application.countDocuments()
        ]);

        return res.status(200).json({
            userCount,
            jobsCount,
            applicationCount
        });
    }
    catch(e){
        return res.status(500).json({msg: "Something went wrong!!!", errors: e});
    }
}


export const toggleUserStatus = async (req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        if(!currentUser) return res.status(404).json({msg: "User not found!!!"});

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId, 
            { isActive: !currentUser.isActive }, 
            { new: true }
        );
        
        return res.status(200).json({msg: "Status updated successfully..."});
    }
    catch(e){
        console.log("ERROR:", e); 
        return res.status(500).json({msg: "Something went wrong!!!", errors: e});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ users });
    } catch (e) {
        return res.status(500).json({ msg: "Something went wrong!!!", errors: e });
    }
}