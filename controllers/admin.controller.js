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
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, [{ $set: { isActive: { $not: "$isActive" } } }], {new: true});
        if(!updatedUser) return res.status(404).json({msg: "User not found!!!"});
        
        return res.status(200).json({msg: "Status updated successfully..."});
    }
    catch(e){
        return res.status(500).json({msg: "Something went wrong!!!", errors: e});
    }
}