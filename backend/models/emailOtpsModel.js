import mongoose from "mongoose"
const emailOtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    attempts:{
        type:Number,
        default:0
    }
})
emailOtpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);
export default mongoose.model("EmailOtp",emailOtpSchema);