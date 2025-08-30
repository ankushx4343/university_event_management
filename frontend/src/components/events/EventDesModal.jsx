import { Calendar, Clock, MapPin, Users, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContex } from '../../context/AuthContext';

function EventDesModal({ event, isOpen, onClose }) {
    const[isRegistered,setIsregistered]=useState(false);
    const{user}=useContext(AuthContex)
    console.log(event.registereduser)
    useEffect(()=>{
        if(event.registereduser.includes(user._id)){
            setIsregistered(true)
        }
    },[])
    if (!isOpen || !event) return null;
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRegister=async()=>{
       try {
         console.log("register")
        const res=await api.put(`/event/register/${event.id}`)
        toast.success(res.data.msg)
        console.log(res.data.msg)
       } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
       }
    }
    
    const handleUnregister=async()=>{
        try {
           const res= await api.delete(`/event/register/${event.id}`)
           toast.success("unregistered successfully")
           console.log(res);
        } catch (error) {
            console.log(error.message)
            toast.error("cannot unregister for the event")
        }
    }
    const formattedDate = new Date(event.eventdate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit"
    })
    return (
        <div className='fixed z-0 inset-0 bg-black/30  backdrop-blur-sm h-full w-full flex justify-center items-center'
            onClick={handleBackdropClick}>
                <Toaster/>
            <div className='bg-gray-200 h-[700px] w-[650px] rounded-2xl overflow-clip'>
                <div className='bg-gray-200 h-[700px] w-[650px] rounded-2xl overflow-y-auto py-4 px-2'>
                    <div className='flex justify-between items-center'>
                    <h1 className='text-4xl font-bold px-5 mt-3 mb-2'>{event.title}</h1>
                    <div className='' onClick={onClose}>
                        <X className='w-10 h-10' />
                    </div>
                </div>
                <div className='w-full bg-gray-400 h-[2px] mt-4'></div>
                <div className='h-64 w-full'>
                    <img></img>
                </div>
                <div className='px-5 flex flex-col gap-7'>
                    <div className='flex gap-3 text-xl'>
                        <div className='text-blue-700'>
                            <Calendar className='w-7 h-7' />
                        </div>
                        <span className='font-bold'>Date:</span>
                        <span>{formattedDate}</span>
                    </div>

                    <div className='flex gap-3 text-xl'>
                        <div className='text-green-700'>
                            <Clock className='w-7 h-7' />
                        </div>
                        <span className='font-bold'>Time:</span>
                        <span>{event.eventtime}</span>
                    </div>

                    <div className='flex gap-3 text-xl'>
                        <div className='text-red-700'>
                            <MapPin className='w-7 h-7' />
                        </div>
                        <span className='font-bold'>Location:</span>
                        <span>{event.location}</span>
                    </div>

                    <div className='flex gap-3 text-xl'>
                        <div className='text-blue-700'>
                            <Users className='w-7 h-7' />
                        </div>
                        <span className='font-bold'>Capacity:</span>
                        <span>{event.capacity}</span>
                    </div>
                </div>

                <div className='mt-7 px-5 flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>About this page</h1>
                    <p className='text-lg'>{event.description}</p>
                </div>

                <div className='py-6 px-10 m-4 bg-gray-300 w-[90%] rounded-2xl flex flex-col gap-3'>
                    <h1 className='text-2xl '>Organizer</h1>
                    <h2 className='text-lg text-gray-500'>TechEvents Inc.</h2>
                </div>
                {
                    isRegistered?(
                        <div onClick={handleUnregister} className='w-[90%] bg-red-400 text-black rounded-2xl p-5 mx-4 text-xl font-semibold  hover:bg-red-600 hover:text-white transition ease-in'>
                    UnRegister
                         </div> 
                    ):(
                        <div onClick={handleRegister} className='w-[90%] bg-blue-500 rounded-2xl p-5 mx-4 text-xl font-semibold text-white hover:bg-blue-600'>
                    Register
                        </div> 
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default EventDesModal