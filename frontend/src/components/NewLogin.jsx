import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React, { useContext, useState } from 'react'
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import api, { setToken } from "@/services/api"
import { AuthContex } from "@/context/AuthContext"
import toast from "react-hot-toast"

function NewLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { login } = useContext(AuthContex);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });

            if (res.data.success) {
                setToken(res.data.token);
                login(res.data.user);
                toast.success(res.data.message || "Login successful!");
                navigate("/dashboard");
            } else {
                toast.error(res.data.message || "Login failed!");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

return (
    <Card>
        <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
            <CardAction>
                <Link to={"/register"}>
                    <Button variant="link">Sign up</Button>
                </Link>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form >
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="an@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleLogin}>Login</Button>
        </CardFooter>
    </Card>
)
}

export default NewLogin