import mongoose from "mongoose";
import Event from "../models/eventModel.js";
import  AppError from "../utils/AppError.js";


export const createEventService=async(data,userId)=>{
    const{
        title,
        description,
        eventdate,
        eventtime,
        registrationdeadline,
        location,
        capacity,
        category
    }=data
    if(
       !title ||
       !description ||
       !eventdate ||
       !eventtime ||
       !location ||
       !registrationdeadline ||
       !capacity ||
       !category 
    ){
        throw new AppError("all fields are required",400)
    }

    //business rule validations
    const now=new Date();

    if(new Date(eventdate)<=now){
        throw new AppError("event date must be in future",400);
    }

    if(new Date(registrationdeadline)>=new Date(eventdate)){
        throw new AppError("registration deadline must be before event date",400);
    }
    if(capacity<=0){
        throw new AppError("capacity of the event must be greater than 0");
    }

    //create event
    const event=await Event.create({
        title,
        description,
        eventdate,
        eventtime,
        location,
        capacity,
        registrationdeadline,
        category,
        createdBy:userId
    })
    return event;
}

export const getAllEventsService=async()=>{
    const events=await Event.find()
    .populate('createdBy','firstname lastname email _id')
    .populate('registereduser','firstname lastname email studentId department');
    return events;
}

export const getEventByIdService=async(event_id)=>{
    if(!mongoose.Types.ObjectId.isValid(event_id)){
        throw new AppError("event id is not valid",400)
    }
    const event=await Event.findById(event_id);
    if(!event){
        throw new AppError("event not found",404);
    }
    return event;
}