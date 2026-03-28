import "dotenv/config"
import express from "express";
import connectDB from "./config/db.js";
const PORT = process.env.PORT;
import router from "./routes/auth.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", router);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);


app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT);
})