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

function NewSignup() {

    const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [studentId, setStudentId] = useState("");
    const { login } = useContext(AuthContex);

    const handleRegister = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(Fname, Lname, email, password, department, studentId)
        let res
        try {
            res = await api.post("/auth/signup", {
                "firstname": Fname,
                "lastname": Lname,
                "email": email,
                "password": password,
                "department": department,
                "studentId": studentId
            })
            setToken(res.data.token);
            console.log(localStorage.getItem('token'))
            toast.success("User created successfuly")
            login(res.data.user)
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Enter your details below to sign up to your account</CardDescription>
                <CardAction>
                    <Link to={"/login"}>
                        <Button variant="link">Log in</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form >
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="fname">First name</Label>
                            <Input
                                id="fname"
                                type="text"
                                placeholder="Ankush Rana"
                                value={Fname}
                                onChange={(e) => setFname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lname">last name</Label>
                            <Input
                                id="lname"
                                type="text"
                                placeholder="Rana"
                                value={Lname}
                                onChange={(e) => setLname(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="grid gap-2">
                            <Label htmlFor="email">Department</Label>
                            <Input
                                id="dpart"
                                type="text"
                                placeholder="CSE"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stdid">Student id</Label>
                            <Input
                                id="stdid"
                                type="text"
                                placeholder="BSC241777"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={handleRegister}>{
                    loading?"Loading...":"Sign Up"
                    }</Button>
            </CardFooter>
        </Card>
    )
}

export default NewSignup