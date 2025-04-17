import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
connectDB()
let app = express();

app.use(express.json())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",userRouter)
app.all("*",(req,res,next)=>{
    let err = new Error("page not found");
    err.statusCode = 404;
    next(err)
});
// global error handler

app.use((err,req,res,next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    res.status(statusCode).json({
        message:message,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,    });
});

export default app;