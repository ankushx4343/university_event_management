import EmailOtp from "../models/emailOtpsModel.js"
import User from "../models/userModel.js";
import { sendOTP } from "../services/emailservices.js";

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
        const expiresAt=new Date(Date.now()+10*1000)
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