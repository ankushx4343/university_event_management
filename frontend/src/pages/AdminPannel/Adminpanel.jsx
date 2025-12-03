import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function Adminpanel() {
  return (
    <div className='h-screen w-screen bg-gray-500 grid grid-cols-5'>
      <div className='col-span-1 h-full bg-amber-300 '>
        <Sidebar/>
      </div>
      <div className='col-span-4 h-fit overflow-y-scroll bg-blue-500 rounded-8xl flex justify-center items-center '>
        <Outlet/>
      </div>
    </div>
  )
}

export default Adminpanel