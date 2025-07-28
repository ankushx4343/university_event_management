import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
};

//signup user
export const signup=async(req,res)=>{
    try {
        const {firstname,lastname,email,password,department,studentId}=req.body;

        //check user exists or not
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }

        //create user
        const user=await User.create({
            firstname,
            lastname,
            email,
            password,
            department,
            studentId
            //role will automatically 'student' assigned to user
        })

        const token=generateToken(user._id);

        res.status(201).json({
            success:true,
            message:"student created successfully",
            token,
            user:{
                id:user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                role:user.role,
                studentId:user.studentId,
                department:user.department
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//login user

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({  //“The server cannot process the request because it’s invalid or malformed.”
                success:false,
                message:"please provide email and password"
            })
        }
        
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        console.log(user.password)
        //check password
        const isCorrect=await user.comparePassword(password)
        console.log(isCorrect)
        if(!isCorrect){
            res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token=generateToken(user._id)

        res.json({
            success:true,
            message:"sign in successful",
            token,
            user:{
                id:user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                role:user.role,
                studentId:user.studentId,
                department:user.department
            }
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get current user profile
export const getProfile=async(req,res)=>{
    try {
        const user =await User.findById(req.user.id);
        res.json({
            success:true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}
