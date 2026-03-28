import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg: "No token provided!"});
    }
    const token = authHeader.split(" ")[1];

    try{
        const decodedPayload = jwt.verify(token, JWT_SECRET);
        const foundUser = await User.findById(decodedPayload.id).select("-password");
        if(!foundUser){
            return res.status(400).json({msg: "Something went wrong!!!"});
        }
        req.user = foundUser;
        next();
    }
    catch(e){
        return res.status(400).json({msg: `Something went wrong in token verification process. ${e}`});
    }
}

export const restrictTo = (roles) => {
    return (req, res, next) => {
        // req.user exists because verifyToken runs right before this!
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                msg: "You do not have permission to perform this action." 
            });
        }
        next();
    };
};