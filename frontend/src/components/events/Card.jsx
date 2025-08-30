import React, { useContext, useEffect, useState } from 'react'
import { motion as Motion } from "motion/react"
import { Calendar,ChevronRight,Clock4,MapPin } from 'lucide-react';
import { AuthContex } from '../../context/AuthContext';

function Card({event,onClick}) {
  const[isRegistered,setIsregistered]=useState(false);
  const{user}=useContext(AuthContex)
  console.log(event.registereduser)
  useEffect(()=>{
  if(event.registereduser.includes(user._id)){
    setIsregistered(true)
  }
  },[])

  const formattedDate=new Date(event.eventdate).toLocaleDateString("en-GB",{
    day:"2-digit",
    month:"short",
    year:"2-digit"
  })

  return (
        <Motion.div
        whileHover={{
            scale: 1.02,
           
        }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>onClick(event)}
        className='h-[450px] w-[400px] bg-amber-50 rounded-2xl px-4 py-2 flex flex-col justify-center items-center gap-6 shadow-2xl'>
            <div className='w-full'>
                <div className='text-3xl font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                    {event.title}
                </div> 
                <div className='bg-blue-500 h-2 w-[100px] rounded-2xl mt-3'></div>   
            </div>  

            {/* event info */}
            <div className=' w-full flex flex-col items-start mt-3 gap-3'>
              {/* event date */}
              <div className='flex justify-center  items-center gap-5 m-1'>
                <div className='w-12 h-12 bg-blue-200 flex justify-center items-center rounded-lg'>
                 <Calendar className='w-6 h-6 text-blue-700'/>
                </div>
                <div className='text-xl '>
                    <h1 className=''>Event Date</h1>
                    <h2 className='font-bold'>{formattedDate}</h2>
                </div>
              </div>

              {/* location */}
              <div className='flex justify-center  items-center gap-5 m-1'>
                <div className='w-12 h-12 bg-green-200 flex justify-center items-center rounded-lg'>
                 <MapPin className='w-6 h-6 text-green-700'/>
                </div>
                <div className='text-xl '>
                    <h1 className=''>Location</h1>
                    <h2 className='font-bold'>{event.location}</h2>
                </div>
              </div>

              {/* event deadline */}
              <div className='flex justify-center  items-center gap-5 m-1'>
                <div className='w-12 h-12 bg-red-200 flex justify-center items-center rounded-lg'>
                 <Clock4 className='w-6 h-6 text-red-700'/>
                </div>
                <div className='text-xl '>
                    <h1 className=''>Time </h1>
                    <h2 className='font-bold'>{event.eventtime}</h2>
                </div>
              </div>
            </div>
            {
              isRegistered?(
              <div className='w-full bg-gray-300  rounded-xl p-3 px-6 flex justify-between items-center text-2xl font-semibold hover:bg-gray-700 hover:text-white'>
            <h1>
                Registered
            </h1>
            <div className='flex justify-center'>
              <ChevronRight/>
            </div>
          </div>):(
          <div className='w-full bg-gray-100  rounded-xl p-3 px-6 flex justify-between items-center text-2xl font-semibold hover:bg-blue-400 hover:text-white'>
            <h1>
                Registration
            </h1>
            <div className='flex justify-center'>
              <ChevronRight/>
            </div>
          </div> )
            }
     

        </Motion.div>

  )
}

export default Card