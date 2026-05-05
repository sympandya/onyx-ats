import { Router } from "express";
import { restrictTo, verifyToken } from "../middleware/auth.middleware.js";
import { getStats, toggleUserStatus, getAllUsers } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/", verifyToken, restrictTo(["admin"]), getStats);
adminRouter.patch("/toggleUser/:userId", verifyToken, restrictTo(["admin"]), toggleUserStatus);
adminRouter.get("/users", verifyToken, restrictTo(["admin"]), getAllUsers);

export default adminRouter;