import { Router } from "express";
import { applyJob, exportApplicants, getApplicants, updateStatus } from "../controllers/application.controller.js";
import { verifyToken, restrictTo } from "../middleware/auth.middleware.js";

const applicationRouter = Router();

applicationRouter.post("/apply/:jobId", verifyToken, restrictTo(["candidate"]), applyJob);
applicationRouter.get("/:jobId/applicants", verifyToken, restrictTo(["recruiter"]), getApplicants);
applicationRouter.patch("/status/:applicationId/update", verifyToken, restrictTo(["recruiter"]), updateStatus);
applicationRouter.get("/export/:jobId/", verifyToken, restrictTo(["recruiter"]),exportApplicants );

export default applicationRouter;