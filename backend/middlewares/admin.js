
export const admin=async(req,res,next)=>{
    try {
        const user=req.user;//user is attached to the request object by the auth middleware
        console.log(user)
        if(!user){
            return res.status(401).json({
                 message:"not authorized to access this route",
                 user:user
            })
        }
        if(user.role!=='admin'){
            return res.status(403).json({
                message:"you are not allowed to access this route",
                user:user
            })
        }
        next(); //if user is admin, proceed to the next middleware or route handler
    } catch (error) {
        console.log(error.message)
    }
} 