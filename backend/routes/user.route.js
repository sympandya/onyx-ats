import { Router } from "express";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";
import { candidateProfileUpdate, getUserProfile, recruiterProfileUpdate } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.patch('/candidate/profileUpdate', verifyToken, restrictTo(["candidate"]), candidateProfileUpdate);
userRouter.patch('/recruiter/profileUpdate', verifyToken, restrictTo(["recruiter"]), recruiterProfileUpdate);
userRouter.get('/me', verifyToken, getUserProfile);

export default userRouter;