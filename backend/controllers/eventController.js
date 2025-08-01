import mongoose from "mongoose";
import Event from "../models/eventModel.js"

//creating event
export const createEvent=async(req,res)=>{
    try {
        const{title,description,eventdate,eventtime,registrationdeadline,location,capacity}=req.body;
        if(!title || !description || !eventdate || !eventtime || !registrationdeadline || !location || !capacity){
            return res.status(400).json({
                success:false,
                msg:"all fields are required"
            })
        }
        const event=await Event.create({ 
            title,
            description,
            eventdate,
            eventtime,
            registrationdeadline,
            location,
            capacity,
            createdBy:req.user._id
        })

        if(!event){
            return res.status(500).json({
                success:false,
                msg:"internal server error"
            })
        }
        return res.status(201).json({
            success:true,
            msg:"event created successfully",
            event:event
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

//getting all events
export const getAllEvent=async(req,res)=>{
    try {
        const events=await Event.find();
        return res.status(200).json({
            success:true,
            msg:"event fetched successfully",
            events:events
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:"Internal server error while fetching events",
            error:error.message
        })
    }

}

//get event by its id
export const getEventById=async(req,res)=>{
    try {
        const eventId=req.params.id
        if(!mongoose.Types.ObjectId.isValid(eventId)){
           return res.status(400).json({
            success:false,
            msg:"invalid event id"
           })
        }
        const event=await Event.findById(eventId);
        if(!event){
           return res.status(404).json({
                success:false,
                msg:"event not found"
            })
        }
        return res.status(200).json({
            success:true,
            event:event
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            msg:"internal server error",
            error:error.message
        })
    }
}