import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../context/useAuth'
import { LogOut } from 'lucide-react';

function Navbar() {
    const [isVisible,setIsVisible]=useState(true);
    const [lastScrollY,setLastScrollY]=useState(0);
    useEffect(()=>{
        const handleScroll=()=>{
            const currentScrollY=window.scrollY;

            if(currentScrollY<lastScrollY){
                setIsVisible(true);
            }else if(currentScrollY>lastScrollY && currentScrollY>80){
                setIsVisible(false);
            }
            setLastScrollY(currentScrollY);
        }
        window.addEventListener('scroll',handleScroll,{passive:true})
    },[lastScrollY])
    const { user, logout } = useAuth();
    const location = useLocation()
    const navlinks = [
        { path: "/", label: "Home" },
        { path: "/dashboard", label: "Dashboard" },
        { path: "/contacts", label: "Contacts" },
        { path: "/about ", label: "About" },
    ]
    const handleLogout = () => {
        logout();
    }
    console.log(location.pathname.split("/")[1])
    console.log(navlinks[1].path.split("/")[1])

    return (
        <div className={`z-10 transition-transform duration-300 fixed top-0 left-0 right-0 w-full flex justify-center ${isVisible?'translate-y-0':'-translate-y-full'}`}>
            <div className='z-10  mx-auto w-screen bg-black backdrop-blur-lg h-20 flex justify-between px-10  items-center'>
                <div className='flex items-center gap-8'>
                    <Link to={"/"}>
                        <h1 className='text-2xl font-bold text-white'>UniE</h1>
                    </Link>

                </div>
                <div className='flex items-center gap-10' >
                    <div >
                        <ul className='flex gap-4 items-center font-semibold text-gray-100 transition-all ease-in-out duration-200'>
                            {
                                navlinks.map((link) => {
                                    return (
                                        <li className={`${location.pathname.split("/")[1] === link.path.split("/")[1] ? "border-b-2 " : ""} hover:text-blue-300 hover:cursor-pointer transition-colors ease-in-out duration-50 `}>
                                            <Link to={link.path} key={link.label} className='transition-all ease-in-out duration-200'>{link.label}</Link>
                                        </li>
                                    )
                                })
                            }
                            {
                                user?.role === "admin" && (
                                    <li className={`${location.pathname.startsWith("/admin") ? "border-b-2 " : ""} hover:text-blue-300 hover:cursor-pointer transition-all ease-in-out duration-200`}>
                                        <Link to={"/admin"} key={"admin"} className='transition-all ease-in-out duration-200'>Admin</Link>
                                    </li>
                                )

                            }
                        </ul>
                    </div>
                    {
                        !user ? (
                            <div className='flex '>
                                <Link
                                    to={"/login"}
                                    className='text-white text-[14px] bg-black/60 px-3 py-1 border-white/40 border-[1px] rounded-md inset-shadow-zinc-100 font-semibold hover:cursor-pointer hover:bg-blue-500/10 mx-3 transition-colors ease-in-out duration-50'>Log in</Link>
                                <Link
                                    to={"/register"}
                                    className='bg-white px-3 py-1 rounded-md font-semibold text-[14px] hover:cursor-pointer hover:shadow-2xl transition-colors ease-in-out duration-50'>Get started</Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className='flex gap-2 bg-white font-semibold text-black  py-1 px-2 rounded-lg items-center hover:cursor-pointer  hover:border-b-2 transition-colors duration-300 ease-in'>

                                <h3>
                                    logout
                                </h3>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar