import { Router } from "express";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";
import { candidateProfileUpdate, recruiterProfileUpdate } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.patch('/candidate/update', verifyToken, restrictTo(["candidate"]), candidateProfileUpdate);
userRouter.patch('/recruiter/update', verifyToken, restrictTo(["recruiter"]), recruiterProfileUpdate);

export default userRouter;