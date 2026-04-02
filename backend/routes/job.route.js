import { Router } from "express";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";
import { postJob, getAllJobs, getJobById, saveJob, getSavedJobs, getMyJobs, askQuestion, answerAQuestion, getJobQnA } from "../controllers/job.controller.js";

const jobRouter = Router();
  
jobRouter.get('/', getAllJobs); 
jobRouter.post('/', verifyToken, restrictTo(["recruiter"]), postJob); 

jobRouter.get('/myJobs', verifyToken, restrictTo(["recruiter"]), getMyJobs);
jobRouter.get('/saved-jobs', verifyToken, restrictTo(["candidate"]), getSavedJobs);
jobRouter.get('/:jobId', getJobById); 
jobRouter.post('/saved-jobs/:jobId', verifyToken, restrictTo(["candidate"]), saveJob);


jobRouter.post('/qa/ask/:jobId', verifyToken, restrictTo(["candidate"]), askQuestion);
jobRouter.post('/qa/answer/:jobId/:questionId', verifyToken, restrictTo(["recruiter"]), answerAQuestion);
jobRouter.get('/qa/:jobId', verifyToken, restrictTo(["candidate", "recruiter"]), getJobQnA);

export default jobRouter;