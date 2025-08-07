
import { useState } from "react";
import { AuthContex } from "./AuthContext";

 export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    const login=(userdata)=>{
        setUser(userdata)
    }

    const logout=()=>{
        setUser(null);
    }
    return(
        <AuthContex.Provider value={{user,login,logout}}>
            {children}
        </AuthContex.Provider>
    )
}
export default AuthProvider
