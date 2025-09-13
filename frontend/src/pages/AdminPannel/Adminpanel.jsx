import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function Adminpanel() {
  return (
    <div className='h-screen w-screen bg-gray-500 grid grid-cols-5'>
      <div className='col-span-1 h-full bg-amber-300'>
        <Sidebar/>
      </div>
      <div className='col-span-4 h-full bg-blue-500 rounded-8xl'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Adminpanel