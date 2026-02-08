import EmailOtp from "../models/emailOtpsModel.js"
import User from "../models/userModel.js";
import { sendOTP } from "../services/emailservices.js";
import jwt from 'jsonwebtoken'

export const otpgenerate=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email || !email.includes("@")){
            res.status(400).json({
                msg:"invalid email"
            })
        }
        const existingUser=await User.findOne({email});
        console.log(existingUser)
        if(existingUser){
            return res.status(409).json({
                msg:"user already exists"
            })
        }
        const expiresAt=new Date(Date.now()+5*60*1000)
        const otp= Math.floor(100000 + Math.random() * 900000).toString();
        await EmailOtp.findOneAndDelete({email});
        const result=await EmailOtp.create({
            email,
            otp,
            expiresAt
        })
        await sendOTP(email,otp)
        res.status(200).json({
            msg:"otp sent",
            result
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"some error occured"
        })
    }
}

export const otpverify=async(req,res)=>{
    try {
       const {email,otp}=req.body;
       const record=await EmailOtp.findOne({email});
       if(!record)return res.status(400).json({message:"OTP not found or already used"})
       if(record.expiresAt<new Date()){
        EmailOtp.deleteOne({email})
        return res.status(400).json({message:"OTP expired"})
       }
       if(record.attempts>=3)return res.status(400).json({message:"Too many attempts"}) 
        if(record.otp!=otp){
            record.attempts+=1;
            await record.save()
            return res.status(400).json({message:"Invalid otp"})
        }
        const verificationtoken=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"10m"});
        await EmailOtp.deleteOne({email})
        return res.status(200).json({
            message:"Email varified",
            verificationtoken
        })
    } catch (error) {
        
    }
}