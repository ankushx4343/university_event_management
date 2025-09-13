import React from 'react'
import { Building2 } from 'lucide-react';
import { Users } from 'lucide-react';
import { Goal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function Sidebar() {
    const sideLinks=[
         {path:"/admin",label:"Dashboard",icon: Building2},
         {path:"/admin/usermanagement",label:"User Management",icon: Users},
         {path:"/admin/eventmanagement",label:"Event Management",icon: Goal},
    ]
  const location=useLocation();
  console.log(location.pathname)
  return (
    <div className='bg-white w-full h-full '>
        <div className='pt-20 flex flex-col justify-center align-center'>
            <h1 className='text-blue-600 text-3xl font-bold text-center'>EventAdmin</h1>
            <h2 className='text-gray-500 text-center mt-4 text-xl'>University Management</h2>
        </div>
        <div className='mt-4'>
            <div className='flex flex-col w-full overflow-clip gap-2'>
                {sideLinks.map((link)=>{
                    const Icon=link.icon
                    const isActive = location.pathname === link.path;
                    return(
                <Link to={link.path}
                        className={`flex gap-6 items-center transition-all duration-300 ease-in-out ml-2 px-10 py-6 
                            ${isActive
                                ?'translate-x-2 bg-blue-500 text-white'
                                :'hover:translate-x-2  hover:bg-blue-500 hover:text-white'}`
                            }>
                    <Icon className='scale-105' />
                    <h1 className='text-xl'>{link.label}</h1>
                </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Sidebar