import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from "validator";
const User=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"firstname is required"]
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message:"please provide avalid email"
        }
        //using match
        // match:[
        //      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,//regex expression
        //         //  ^ // String ki shuruat
        //         //\w  // Word character (a-z, A-Z, 0-9, _)
        //         //  +   // One or more times
        //         // Example: "rahul", "john123", "user_name"
        //         // [.-]  // Either dot (.) or hyphen (-)
        //         // ?     // Optional (0 or 1 time)
        //         // \w+   // Followed by word characters
        //         // *     // Zero or more times
        //         //@ // Literal @ character (required)
        //         //\.     // Literal dot (escaped)
        //          // \w{2,3} // 2 or 3 word characters
        //          // +      // One or more times
        //          //$ // String ka end
        //      "please enter valid string "
        // ]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:6
    },
    role:{
        type:String,
        enum:{
            values:['student','admin'],
            message:'role must be either student or admin'
        },
        default:'student'
    },
    studentId:String,
    department:String,
    registeredEvents:[{
        type:mongoose.Schema.ObjectId,
        ref:'Event'
    }]
},{timestamps:true})

//passwordhashing middleware
User.pre('save',async function(next)    {
  if(!this.isModified('password')) return next();
  this.password=await bcrypt.hash(this.password,12);
  next()
})

User.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User',User)