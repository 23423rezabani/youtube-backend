import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



import authRout from "./routes/authRoutes.js";
import userRout from "./routes/userRoutes.js";
import youtuberRout from "./routes/youtuberRoutes.js"



dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRout);
app.use('/api/users',userRout)
app.use('/api/youtuber',youtuberRout)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
 app.listen(3000,()=>{
    console.log('connected to database')
 })
}).catch((err)=>{
 console.log(err,"not connected")
})
