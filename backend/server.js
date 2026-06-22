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
import cors from "cors"

const app = express();
app.use(express.json());
// app.use(ExpressMongoSanitize());
const allowedOrigins = [
    'http://localhost:5173',
    'https://onyx-ats.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
        }
    },
    credentials: true
}));

connectDB();

app.use("/api/auth", router);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);


if (process.env.NODE_ENV !== 'production') {
    const port = PORT || 8000;
    app.listen(port, () => {
        console.log("Server running on port: ", port);
    });
}

export default app;