import mongoose from "mongoose";//sirf ek barr import krna hai //Entry point pe na ki hrr file mei


const  connectDB=async()=>{
    try {
        console.log(process.env.MONGO_URI)
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect successfuly to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1); // "Database nahi mila, app band karo"
    }
}

export default connectDB;