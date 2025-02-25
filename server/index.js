import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet, { crossOriginResourcePolicy } from 'helmet'
import connectDb from './config/connectDb.js'
import useRouter from './routes/user.router.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import imageRouter from './routes/image.router.js'
import questionRouter from './routes/question.router.js'
import inLessonRouter from './routes/inlesson.router.js'

dotenv.config()

const app = express()

app.use(express.json()); 
app.use(morgan())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

app.use("/api/user",useRouter )
app.use("/api/image",imageRouter )
app.use("/api/question",questionRouter )
app.use("/api/inlesson",inLessonRouter )


app.get("/", (req,res)=>{
    return res.json({
        message: "server is running"
    })
})

connectDb()

const PORT = 8080 || process.env.port
app.listen(PORT,()=>{
    console.log("listening")
})