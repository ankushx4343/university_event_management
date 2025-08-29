import React, { useContext, useState } from 'react'
import api, { setToken } from '../services/api';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { AuthContex } from '../context/AuthContext';

function Register() {
  
  const navigate=useNavigate();

  const [Fname,setFname]=useState("");
  const [Lname,setLname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [department,setDepartment]=useState("");
  const [studentId,setStudentId]=useState("");
  const {login}=useContext(AuthContex);

  const handleRegister=async(e)=>{
    e.preventDefault();
    console.log(Fname,Lname,email,password,department,studentId)
    let res
    try {
      res=await api.post("/auth/signup",{
      "firstname":Fname,
      "lastname":Lname,
      "email":email,
      "password":password,
      "department":department,
      "studentId":studentId
    })
     setToken(res.data.token);
    console.log(localStorage.getItem('token'))
    toast.success(res.data.token)
    login(res.data.user)
    navigate('/dashboard')
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.message)
    }
  }

  return (
     <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <Toaster/>
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleRegister} className="space-y-5">
        {/* First Name */}
        <div>
          <label htmlFor="fname" className="block text-gray-700 font-semibold mb-1">
            First Name
          </label>
          <input
            id="fname"
            type="text"
            placeholder="Enter your first name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lname" className="block text-gray-700 font-semibold mb-1">
            Last Name
          </label>
          <input
            id="lname"
            type="text"
            placeholder="Enter your last name"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-gray-700 font-semibold mb-1">
            Department
          </label>
          <input
            id="department"
            type="text"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Student ID */}
        <div>
          <label htmlFor="studentId" className="block text-gray-700 font-semibold mb-1">
            Student ID
          </label>
          <input
            id="studentId"
            type="text"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register