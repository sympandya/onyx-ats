import { Router } from "express";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";
import { postJob, getAllJobs, getJobById } from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.post('/post', verifyToken, restrictTo(["recruiter"]), postJob);
jobRouter.get('/getAllJobs', getAllJobs);
jobRouter.get('/getJobById/:jobId', getJobById);

export default jobRouter;