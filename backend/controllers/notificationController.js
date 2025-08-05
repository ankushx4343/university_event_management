import Notification from "../models/notificationModel.js";

export const getUserNotifications=async(req,res)=>{
    try {
        const id=req.user.id;
        const notifications=await Notification.find({user:id})
        .sort({createdAt:-1})
        .populate('relatedEvents','title eventdate')
        .populate('user','name email')
        .lean()

        res.status(200).json({
            success:true,
            count:notifications.length,
            data:notifications
        })
    } catch (error) {
        console.log("error in getting notifications",error)
        res.status(500).json({
            success:false,
            message:'server error'
        })
    }
}

export const markNotification=async(req,res)=>{
    try {
        const NotificationId=req.params.id;
        const userId=req.user.id;
        
        //now lets check weather user and its related notidications exists or not
        const notification=await Notification.findOne({
            _id:NotificationId,
            user:userId
        })

        if(!notification){
            return res.status(404).json({
                success:false,
                message:'Notification not found'
            })
        }

        notification.read=true;
        await notification.save();
        return res.status(200).json({
            success:true,
            msg:"marked notification as true"
        })
    } catch (error) {
        console.log("error in marking the notification as true",error)
        return res.status(500).json({
            success:false,
            msg:"internal server error"
        })
    }
}

//helper function -Notification creating
export const createNotification=async(userId,message,type,relatedEvent=null)=>{
   try {
    const notification=await Notification.create({
        user:userId,
        message:message,
        type:type,
        relatedEvents:relatedEvent
    })
    return notification
   } catch (error) {
    console.error("error while creating notification:",error)
   }
}