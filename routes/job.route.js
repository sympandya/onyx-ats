import { Router } from "express";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";
import { postJob, getAllJobs, getJobById, saveJob, searchJob, askQuestion, answerAQuestion, getJobQnA } from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.post('/post', verifyToken, restrictTo(["recruiter"]), postJob);
jobRouter.get('/getAllJobs', getAllJobs);
jobRouter.get('/getJobById/:jobId', getJobById);
jobRouter.post('/saved-jobs/:jobId', verifyToken, restrictTo(["candidate"]), saveJob);
jobRouter.post('/', verifyToken, searchJob);
jobRouter.post('/qa/ask/:jobId', verifyToken, restrictTo(["candidate"]), askQuestion);
jobRouter.post('/qa/answer/:jobId/:questionId', verifyToken, restrictTo(["recruiter"]), answerAQuestion);
jobRouter.get('/qa/getJobs/:jobId', verifyToken, restrictTo(["candidate", "recruiter"]), getJobQnA);

export default jobRouter;