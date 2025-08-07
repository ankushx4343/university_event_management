import { useContext } from "react";
import { AuthContex } from "./AuthContext";

const useAuth=()=>{
    return useContext(AuthContex);
}

export default useAuth;