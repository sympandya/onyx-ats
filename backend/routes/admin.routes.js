import { Router } from "express";
import { restrictTo, verifyToken } from "../middleware/auth.middleware.js";
import { getStats, toggleUserStatus } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/", verifyToken, restrictTo(["admin"]), getStats);
adminRouter.patch("/toggleUser/:userId", verifyToken, restrictTo(["admin"]), toggleUserStatus);

export default adminRouter;