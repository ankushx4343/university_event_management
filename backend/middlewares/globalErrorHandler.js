export default(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        msg:err.isOperational?err.message:"something went wrong"
    });
}