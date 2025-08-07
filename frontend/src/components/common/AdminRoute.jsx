import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

export const AdminRoute=({children})=>{
    const {user}=useAuth();
    if(!user){
        return<Navigate to={"/login"}></Navigate>
    }
    if(user.role!=='admin'){
        return <Navigate to={"/dashboard"}></Navigate>
    }
    return children
}