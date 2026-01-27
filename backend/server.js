import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';
import userRoute from  './routes/userRoute.js';
import notificationRoute from './routes/notificationRoute.js'
dotenv.config();

const app=express();
const port=process.env.PORT ||5000

//connect databse
connectDB();

//middleware
app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute);
app.use("/api/event",eventRoute);
app.use("/api/user",userRoute);
app.use("/api/notifications",notificationRoute)

app.get("/api/test",(req,res)=>{
    res.json({
        msg:"server is running"
    })
})
  
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
