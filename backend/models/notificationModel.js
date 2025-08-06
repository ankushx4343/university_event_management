import mongoose from 'mongoose'

const Notifications=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        enum:['registration_success','event_reminder','event_updated','event_cancelled','registration_canceled'],
        default:'registration_success'
    },
    read:{
        type:Boolean,
        default:false
    },
    relatedEvents:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }
},{timestamps:true})

export default mongoose.model('Notification',Notifications);