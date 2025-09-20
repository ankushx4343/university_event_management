import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//auth.js middleware structure
const protect=async(req,res,next)=>{
    try {
        //check if token is present in the request header
        if(!req.headers.authorization){
            return res.status(401).json({
                message:"not authorized to access this route"
            })
        }
        let token=req.headers.authorization;
        console.log(token)
        if(token){
            token=token.split(" ")[1];
            console.log(token);
            let decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded){
                return res.status(401).json({
                    message:"not authorized to access this route"
                })
            }

            console.log("decode",decoded);

            const user=await User.findById(decoded.id)

            if(!user){
                return res.status(401).json({
                    message:"user not found"
                })
            }
            req.user=user; //attach user to request object
            console.log(user);
           return next();
        }
        console.log("cannot access the events")
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

export default protect;