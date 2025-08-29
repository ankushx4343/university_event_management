import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../context/useAuth.js'

function Header() {
    const {user,logout}=useAuth();
  
    const handleLogout=()=>{
     logout()
    }
  return (
    <div className='flex justify-between items-center bg-zinc-100 top-0 px-10 py-2  shadow-md h-16'>
          <Link to={"/home"}>
            <div className='text-2xl font-bold uppercase font-sans'>university</div>
          </Link>
      <div className='flex gap-10'>  
          <div className='flex gap-8 justify-center items-center text-xl'>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/events"}>Events</Link>
            <Link to={"/contacts"}>Contacts</Link>
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
                 <button onClick={handleLogout} className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded'>
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