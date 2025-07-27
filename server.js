import express from 'express'
import connectDB from './config/db.js';
import dotenv from "dotenv"
import cors from 'cors'
import authRoute from './routes/authRoute.js'
dotenv.config();

const app=express();
const port=process.env.PORT ||5000

//connect databse
connectDB();

//middleware
app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute);
app.get("/api/test",(req,res)=>{
    res.json({
        msg:"server is running"
    })
})

app.listen("3000",()=>{
    console.log("listening on port 3000")
    
})