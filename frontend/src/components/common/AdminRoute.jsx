import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

export const AdminRoute=({children})=>{
    const {user}=useAuth();
    console.log(user)
    if(!user){
        return<Navigate to={"/login"}></Navigate>
    }
    if(user.role!=='admin'){
        return <Navigate to={"/dashboard"}></Navigate>
    }
    return children
}