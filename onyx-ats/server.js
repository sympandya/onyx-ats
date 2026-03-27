import "dotenv/config"
import express from "express";
import router from "./routes/auth.route.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", router);

app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT);
})