
import { useState } from "react";
import { AuthContex } from "./AuthContext";
import api, { getToken, removeToken } from "../services/api";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = async (userdetails) => {
        console.log(userdetails)
        setUser(userdetails);
    }

    const logout = () => {
        removeToken();
        setUser(null);
    }

    const fetchuserfromtoken = async (token) => {
        try {
            console.log(user)
            console.log(token)
            const response = await api.get("/user/me")
            setUser(response.data.user)
            console.log(response.data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchuserfromtoken(token);
        } else {
            setLoading(false);
        }
    }, []);


    if (loading) {
        return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="scale-200">

            <Badge className>
                <Spinner data-icon="inline-start" />
                Loading
            </Badge>
            </div>
        </div>)
    }

    return (
        <AuthContex.Provider value={{ user, login, logout }}>
            {children}
        </AuthContex.Provider>
    )
}
export default AuthProvider
