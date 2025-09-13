import React from 'react'
import { motion as Motion } from "motion/react"

function AdminDashboard() {
  return (
    <div className='h-screen min-w-full p-10 '>
      <div
        className='h-[95%] w-[90%]  bg-amber-50 rounded-2xl mx-auto pt-10'>
        <Motion.div 
        whileHover={
          {scale:1.02}
        }
        className='w-[90%] bg-white p-8 mx-auto rounded-3xl flex flex-col gap-2 shadow-2xl'>
          <h1 className='text-4xl font-bold'>DashBoard Overview</h1>
          <h3 className='text-gray-400'>Welcome back! Here's what's happening with your events today.</h3>
        </Motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard