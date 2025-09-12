import React from 'react'
import { Building2 } from 'lucide-react';
import { Users } from 'lucide-react';
import { Goal } from 'lucide-react';

function Sidebar() {
  return (
    <div className='bg-white w-full h-full '>
        <div className='pt-20 flex flex-col justify-center align-center'>
            <h1 className='text-blue-600 text-3xl font-bold text-center'>EventAdmin</h1>
            <h2 className='text-gray-500 text-center mt-4 text-xl'>University Management</h2>
        </div>
        <div className='mt-4'>
            <div className='flex flex-col w-full overflow-clip gap-2'>
                <div className='flex gap-6 items-center transition-all duration-300 hover:translate-x-2 ease-in-out hover:bg-blue-500 hover:text-white px-10 py-6  ml-2   '>
                    <Building2 className='scale-105' />
                    <h1 className='text-xl'>Dashboard</h1>
                </div>
                <div className='flex gap-6 items-center transition-all duration-300 hover:translate-x-2 ease-in-out hover:bg-blue-500 hover:text-white px-10 py-6  ml-2   '>
                    <Users className='scale-105' />
                    <h1 className='text-xl'>User Management</h1>
                </div>
                <div className='flex gap-6 items-center transition-all duration-300 hover:translate-x-2 ease-in-out hover:bg-blue-500 hover:text-white px-10 py-6  ml-2   '>
                    <Goal className='scale-105' />
                    <h1 className='text-xl'>Event Management</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar