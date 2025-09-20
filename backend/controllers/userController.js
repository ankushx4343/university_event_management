import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"



//get current user details
export const getMe=async(req,res)=>{
    let token=req.body.token;
    if(!token){
        res.status(404).json({
            success:false,
            msg:"not authorized"
        })
    }
    token=token.split(" ")[1];
    console.log(token);
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        res.status(401).json({
            success:false,
            
        })
    }
    res.json({
        success:true,
        user:req.user   
    })
}

//update current loged in user
export const updateME=async(req,res)=>{
    try {
        const {firstname,lastname,email,department,studentId}=req.body
          const user=await User.findById(req.user._id)
            if(!user){
               return res.status(404).json({
                   success:false,
                   message:"user not found"
               })
            }
            user.firstname=firstname ||user.firstname;
            user.lastname=lastname || user.lastname;
            user.email=email || user.email;
            user.department=department || user.department;
            user.studentId=studentId || user.studentId;
            user.save()
            res.status(200).json({
                success:true,
                message:"user updated successfully",
                newUser:user
            })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

//delete current loged in user
export const deleteMe=async(req,res)=>{
    try{
        const DeleteUser=await User.findByIdAndDelete(req.user._id);
        if(!DeleteUser){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

//change passowrd
export const changePassword=async(req,res)=>{
    try {
         const {currentPassword,newPassword}=req.body;
         const user=await User.findById(req.user._id)
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"user not found"
                })
            }

         const isMatch=await user.comparePassword(currentPassword);
         if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"current password is incorrect"
            })
         }  
          user.password=newPassword;
          user.save();
          res.status(200).json({
                success:true,
                message:"password changed successfully"
          })  
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

//Admin routes here

//for getting all the users
export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()//fetch all users
        if(!users || users.length ===0){
            return res.status(404).json({
                success:false,
                message:"no users found"
            })
        } 
        return res.status(200).json({
            success:true,
            users:users
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

//get specific user by id 
export const getUserById=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            user:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

//delete user by id
export const deleteUserById=async(req,res)=>{
    try {
        const userId=req.params.id,
        user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}   

//get total user count
export const countUser=async(req,res)=>{
    const totaluser=await User.countDocuments()
    res.status(200).json({
        success:true,
        count:totaluser
    })
}
