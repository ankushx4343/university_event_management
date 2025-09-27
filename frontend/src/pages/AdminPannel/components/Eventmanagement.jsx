import React, { useState } from 'react'
import { Calendar, Clock1, Plus } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';
import AddEventModal from './modals/AddEventModal';
import EventInfo from './Additional/EventInfo';

function Eventmanagement() {
  const[showModal,setShowmodal]=useState(false);
  return (
    <div className='w-[95%] min-h-[95%] bg-white rounded-2xl flex flex-col items-center '>
      {
        showModal &&
        <AddEventModal setShowmodal={setShowmodal}/>
      }
      <div className='w-[90%] min-h-[70%] shadow-2xl mt-10 px-10 rounded-2xl pb-10'>
        <div className='flex justify-between  pt-5 '>
          <div className='flex flex-col gap-4'>
            <h1 className='text-5xl font-bold'>Event Management</h1>
            <h3 className='text-2xl text-gray-600 font-semibold'>Manage and organize your event</h3>
          </div>
          <div>
            <button
            onClick={()=>setShowmodal(true)}
            className='flex gap-5 bg-blue-500 py-3 px-5 rounded-2xl text-white font-semibold text-xl items-center '>
              <Plus className='font-bold'/>
              <h1>Add New Event</h1>
            </button>
          </div>
        </div>
        <div className='mt-5 flex flex-col gap-4 width-full'>

          {/* //total events */}
          <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-blue-500'>Total Events</h3>
              <h1 className='text-4xl font-bold text-blue-700'>3</h1>
            </div>
            <div>
              <Calendar className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500'/>
            </div>
          </div>

          {/* //today events */}
          <div className='bg-green-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-green-500'>Today Events</h3>
              <h1 className='text-4xl font-bold text-green-700'>3</h1>
            </div>
            <div>
              <CalendarCheck className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500'/>
            </div>
          </div>

          {/* //upcoming events */}
          <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-blue-500'>Upcoming Events</h3>
              <h1 className='text-4xl font-bold text-blue-700'>3</h1>
            </div>
            <div>
              <Clock1 className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500'/>
            </div>
          </div>

          {/* //total registration */}
          <div className='bg-green-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-green-500'>Total Regitrations</h3>
              <h1 className='text-4xl font-bold text-green-700'>3</h1>
            </div>
            <div>
              <Calendar className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500'/>
            </div>
          </div>

        </div>
      </div>
      <EventInfo/>
    </div>
  )
}

export default Eventmanagement