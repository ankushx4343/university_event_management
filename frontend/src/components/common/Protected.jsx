import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

export const ProtectedRoute=({children})=>{
    const {user}=useAuth();
    console.log(user)
    if(!user){
       {console.log(user)}
       return(
        <Navigate to={"/login"}></Navigate>
       )
    }
    return children;
}