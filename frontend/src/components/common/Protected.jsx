import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

export const ProtectedRoute=({children})=>{
    const {user}=useAuth();
    if(!user){
       {console.log(user)}
       return(
        <Navigate to={"/login"}></Navigate>
       )
    }
    return children;
}