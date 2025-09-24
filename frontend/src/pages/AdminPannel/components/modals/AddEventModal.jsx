import React, { useState } from 'react'
import { Calendar1Icon, Captions, Clock2, MapPin, SquareMinus, Users2, X } from 'lucide-react';

function AddEventModal({setShowmodal}) {
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[date,setDate]=useState("")
    const[time,setTime]=useState("")
    const[deadline,setDeadline]=useState("")
    const[location,setLocation]=useState("")
    const[capacity,setCapacity]=useState(0)
   
     const handleSubmit=()=>{
        console.log("clicked")
        console.log(title)
        console.log(description)
        console.log(date)
        console.log(time)
        console.log(deadline)
        console.log(location)
        console.log(capacity)
     }

  return (
    <div className='fixed inset-0 z-30 bg-black/40 backdrop-blur-2xl absolute top-0  left-0 flex justify-center items-center font-mono tracking-tight'>
        
        <div className='bg-black/40 min-h-[80%] w-[40%] rounded-2xl backdrop-blur-3xl py-10 px-4'>
        <X 
            onClick={()=>setShowmodal(false)}
            className='absolute top-5 right-5 text-white'/>
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="title" className="text-2xl ">
                    Title
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <SquareMinus className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        type='text'
                        placeholder='Enter title of the event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
                        ></input>
                </div>
            </div>

            {/* description */}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="description" className="text-2xl ">
                    Description
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <Captions className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder='Enter description for the event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
                        ></input>
                </div>
            </div>

            {/* Event Date*/}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="eventdate" className="text-2xl ">
                    Date
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <Calendar1Icon className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='eventdate'
                        type='date'
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        placeholder='Enter title of the event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 '
                        ></input>
                </div>
            </div>


            {/*Event time */}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="time" className="text-2xl ">
                    Time
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <Clock2 className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='time'
                        type='time'
                        value={time}
                        onChange={(e)=>setTime(e.target.value)}
                        placeholder='Enter time for event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10  '
                        ></input>
                </div>
            </div>


            {/* registration deadline*/}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="deadline" className="text-2xl ">
                    deadline
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <Calendar1Icon className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='deadline'
                        type='date'
                        value={deadline}
                        onChange={(e)=>setDeadline(e.target.value)}
                        placeholder='Enter title of the event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
                        ></input>
                </div>
            </div>


            {/* location*/}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="location" className="text-2xl ">
                    Location
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <MapPin className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='location'
                        type='text'
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                        placeholder='enter location for event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
                        ></input>
                </div>
            </div>


            {/*capacity*/}
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <label htmlFor="capacity" className="text-2xl ">
                    Capacity
                </label>
                <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
                    <Users2 className='pl-3 absolute left-0 scale-190'/> 
                    <input 
                        id='capacity'
                        type='number'
                        value={capacity}
                        onChange={(e)=>setCapacity(e.target.value)}
                        placeholder='Enter title of the event'
                        className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
                        ></input>
                </div>
            </div>

            <button onClick={handleSubmit} className='bg-blue-500/50 backdrop-blur-3xl h-10 px-5 rounded-2xl text-white font-semibold text-2xl mt-5'>
                Submit
            </button>
        </div>
    </div>
  )
}

export default AddEventModal