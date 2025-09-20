import React from 'react'
import { motion as Motion } from "motion/react"
import { Users } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className='h-screen min-w-full p-10 '>
      <div className='min-h-[95%] w-[90%] h-fit  bg-white rounded-2xl mx-auto pt-10'>
        <Motion.div
          whileHover={
            { scale: 1.02 }
          }
          className='w-[90%] bg-white p-8 mx-auto rounded-3xl flex flex-col gap-2 shadow-2xl'>
          <h1 className='text-4xl font-bold'>DashBoard Overview</h1>
          <h3 className='text-gray-400'>Welcome back! Here's what's happening with your events today.</h3>
        </Motion.div>
        <div className='grid md:grid-cols-2 grid-cols-1 w-[90%] h-[100%] p-20 mx-auto gap-9'>
          <Motion.div
            whileHover={
              {
                scale: 1.015,
                translateY: -11
              }
            }
            className='w-[60%]  bg-red-50 rounded-2xl h-60  shadow-2xl p-8 flex flex-col gap-5'>
            <div className='p-7 bg-blue-700 w-fit rounded-2xl inset-shadow-zinc-300 shadow shadow-2xl'>
              <div className='scale-170'>
                🎯
              </div>
            </div>
            <div>
              <h1 className='text-4xl font-bold  ml-2'>123</h1>
            </div>
            <div className='text-gray-500 text-xl'>
              Active Events
            </div>
          </Motion.div>

          <Motion.div
            whileHover={
              {
                scale: 1.015,
                translateY: -11
              }
            }
            className='w-[60%]  bg-red-50 rounded-2xl h-60  shadow-2xl p-8 flex flex-col gap-5'>
            <div className='p-7 bg-blue-500 w-fit rounded-2xl inset-shadow-zinc-300 shadow shadow-2xl'>
              <div className='scale-170'>
                👥
              </div>
            </div>
            <div>
              <h1 className='text-4xl font-bold  ml-2'>248</h1>
            </div>
            <div className='text-gray-500 text-xl'>
              Toatal users
            </div>
          </Motion.div>

          <Motion.div
            whileHover={
              {
                scale: 1.015,
                translateY: -11
              }
            }
            className='w-[60%]  bg-red-50 rounded-2xl h-60  shadow-2xl p-8 flex flex-col gap-5'>
            <div className='p-7 bg-green-600 w-fit rounded-2xl inset-shadow-zinc-300 shadow shadow-2xl'>
              <div className='scale-170'>
                📅
              </div>
            </div>
            <div>
              <h1 className='text-4xl font-bold  ml-2'>3</h1>
            </div>
            <div className='text-gray-500 text-xl'>
              Today Events
            </div>
          </Motion.div>

          <Motion.div
            whileHover={
              {
                scale: 1.015,
                translateY: -11
              }
            }
            className='w-[60%]  bg-red-50 rounded-2xl h-60  shadow-2xl p-8 flex flex-col gap-5'>
            <div className='p-7 bg-orange-500 w-fit rounded-2xl inset-shadow-zinc-300 shadow shadow-2xl'>
              <div className='scale-170'>
                📊
              </div>
            </div>
            <div>
              <h1 className='text-4xl font-bold  ml-2'>4348</h1>
            </div>
            <div className='text-gray-500 text-xl'>
              Toatal Registration
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard