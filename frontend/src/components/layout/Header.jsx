import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react';
import useAuth from '../../context/useAuth.js'

function Header() {
    const {user,logout}=useAuth();
    const location=useLocation()
    const navlinks=[
      {path:"/dashboard",label:"Dashboard",icon: "📊"},
      {path:"/about",label:"About",icon: "📋"},
      {path:"/events",label:"Events",icon: "🎯"},
      {path:"/contacts",label:"Contacts",icon: "📞"},
    ]
    const handleLogout=()=>{
     logout()
    }

  return (
    <div className='z-[1] flex fixed justify-between items-center bg-zinc-100 top-0 px-10 py-2  shadow-md h-16 w-screen shadow shadow-2xl'>
          <Link to={"/home"}>
            <div className='text-2xl font-bold uppercase font-sans'>university</div>
          </Link>
      <div className='flex gap-10'>  
          <div className='flex gap-8 justify-center items-center text-xl'>

            {
              navlinks.map((link)=>{
                return(
            <Link 
              key={link.path}
              to={link.path}
              className={location.pathname===link.path? "text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-lg  border-blue-600": "text-gray-700 hover:text-blue-500 hover:bg-gray-200 px-3 py-1 rounded-lg transition-all duration-200"}>
                <span>
                  {link.icon}
                </span>

                <span>
                  {link.label}
                </span>
            </Link>
                )
              })
            }
            {
              user?.role==="admin"&&(
            <Link 
              to={"/admin"}
              className={location.pathname==="/admin"? "text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-lg  border-blue-600": "text-gray-700 hover:text-blue-500 hover:bg-gray-200 px-3 py-1 rounded-lg transition-all duration-200"}>
              <span>
                ⚙️
              </span>
              <span>
                Admin
              </span>
            </Link>
              )
            }
          </div>

          <div className='flex gap-4'>
            {!user?(
                <>
                 <button className='px-4 py-2 bg-blue-500 rounded hover:bg-blue-600'>
                    login
                 </button>
                 <button className='px-4 py-2 bg-green-500 rounded hover:bg-green-600'>
                    signup
                 </button>
                </>
            ):(
                <>
                 <button onClick={handleLogout} className='transition-all ease-initial duration-300 px-4 py-2 bg-gray-700 hover:bg-red-600 rounded flex gap-2 text-white font-bold '>
                    <LogOut/>
                    logout
                 </button>
                </>
            )

            }
          </div>
      </div>
    </div>
  )
}

export default Header