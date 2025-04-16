import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("mongodb connection error",error.message);
        
    }
}

export default connectDB;