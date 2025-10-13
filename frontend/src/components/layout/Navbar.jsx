import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../context/useAuth'

function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation()
    const navlinks = [
        { path: "/Home", label: "Home" },
        { path: "/dashboard", label: "Dashboard" },
        { path: "/contacts", label: "Contacts" },
        { path: "/about", label: "About" },
    ]
    return (
        <div className='w-full flex justify-center'>
            <div className='z-10 rounded-full fixed top-5 mx-auto w-[55%] bg-black/70 backdrop-blur-md h-16 flex justify-between px-10  items-center'>
                <div className='flex items-center gap-8'>
                    <Link to={"/home"}>
                        <h1 className='text-3xl font-bold text-white'>UniE</h1>
                    </Link>
                    <div>
                        <ul className='flex gap-4 items-center font-semibold text-gray-100 transition-all ease-in-out duration-200'>
                            {
                                navlinks.map((link) => {
                                    return (
                                        <li className=  {`${location.pathname===link.path?"border-b-2 ":""} hover:text-gray-300 hover:cursor-pointer transition-colors ease-in-out duration-200 `}>
                                            <Link to={link.path} key={link.label} className='transition-all ease-in-out duration-200'>{link.label}</Link>
                                        </li>
                                    )
                                })
                            }
                            {
                                user?.role === "admin" && (
                                    <li className={`${location.pathname==="/admin"?"border-b-2 ":""} hover:text-gray-300 hover:cursor-pointer transition-all ease-in-out duration-200`}>
                                        <Link to={"/admin"} key={"admin"} className='transition-all ease-in-out duration-200'>Admin</Link>
                                    </li>
                                )

                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <button className='text-white text-[14px] bg-black/60 px-3 py-1 border-white/40 border-[1px] rounded-md inset-shadow-zinc-100 font-semibold hover:cursor-pointer hover:bg-blue-500/10 mx-3 transition-colors ease-in-out duration-50'>Log in</button>
                    <button className='bg-white px-3 py-1 rounded-md font-semibold text-[14px] hover:cursor-pointer hover:shadow-2xl transition-colors ease-in-out duration-50'>Get started</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar