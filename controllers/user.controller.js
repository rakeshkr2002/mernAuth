import asyncHandler from "express-async-handler";
import userInstance from "../services/user.services.js";

export const getUsers = asyncHandler(async(req,res,next)=>{
        console.log("userid in getusers",req.userId);
        
        const users = await userInstance.findAllUsers()
        res.status(200).json(users)
})