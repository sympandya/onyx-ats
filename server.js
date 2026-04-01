import "dotenv/config"
import express from "express";
import connectDB from "./config/db.js";
const PORT = process.env.PORT;
import router from "./routes/auth.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.routes.js";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();
app.use(express.json());
app.use(ExpressMongoSanitize());

connectDB();

app.use("/api/auth", router);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT);
})