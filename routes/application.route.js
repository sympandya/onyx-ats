import { Router } from "express";
import { applyJob, exportApplicants, getApplicants, updateStatus, getAppliedJobs } from "../controllers/application.controller.js";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";

const applicationRouter = Router();

applicationRouter.patch("/status/:applicationId/update", verifyToken, restrictTo(["recruiter"]), updateStatus);
applicationRouter.get("/applied", verifyToken, restrictTo(["candidate"]), getAppliedJobs);
applicationRouter.post("/apply/:jobId", verifyToken, restrictTo(["candidate"]), applyJob);
applicationRouter.get("/export/:jobId/", verifyToken, restrictTo(["recruiter"]),exportApplicants );
applicationRouter.get("/:jobId/applicants", verifyToken, restrictTo(["recruiter"]), getApplicants);

export default applicationRouter;