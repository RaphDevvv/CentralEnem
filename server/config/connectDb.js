import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error (
        "Provide uri"
    )
}

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected")
    } catch (error) {
        console.log("databse error", error)
        process.exit(1)
    }
}

export default connectDb