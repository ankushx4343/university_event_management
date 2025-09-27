import { Calendar1, Clock, MapPin, User2, Users } from 'lucide-react'
import React from 'react'

function Infocard({ event }) {
    console.log(event)
    if(!event){
        return(
            <div>
                no event found
            </div>
        )
    }
    return (
        <div className='w-[90%] bg-white mt-5 p-5 rounded-2xl flex flex-col gap-2 shadow shadow-2xl'>
            <div className='flex gap-4 items-center'>
                <h1 className='text-2xl font-semibold'>{event.title}</h1>
                <div className='text-green-800 bg-green-200 font-semibold px-2 py-1  rounded-2xl'>upcoming</div>
                <div className='text-blue-800 bg-blue-200 font-semibold px-2 py-1  rounded-2xl'>created by you</div>
            </div>
            <h2 className='text-xl text-gray-700'>{event.description}</h2>
            <div className='flex items-center gap-4 text-gray-500'>
                <Calendar1 />
                <div className='text-xl'>{event.eventdate?.split("T")[0]}</div>
            </div>
            <div className='flex items-center gap-4 text-gray-500'>
                <Clock />
                <div className='text-xl'>{event.eventtime}</div>
            </div>
            <div className='flex items-center gap-4 text-gray-500'>
                <MapPin />
                <div className='text-xl'>{event.location}</div>
            </div>
            <div className='flex items-center gap-4 text-gray-500'>
                <Users />
                <div className='text-xl'>{event?.registereduser?.length}/{event.capacity}</div>
            </div>

        </div>
    )
}

export default Infocard