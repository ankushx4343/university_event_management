import React, { useState } from 'react'
import { Calendar, Clock1, Plus } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';
import AddEventModal from './modals/AddEventModal';
import EventInfo from './Additional/EventInfo';
import DeleteEventModal from './modals/DeleteEventModal';
import api from '../../../services/api';

function Eventmanagement() {
  const [showModal, setShowmodal] = useState(false);
  const [events, setEvents] = useState([{
    id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring latest innovations",
    date: "2024-11-15",
    time: "09:00",
    location: "Main Auditorium",
    capacity: 500,
    registrations: 234,
    status: "upcoming",
    createdBy: "admin",
    createdAt: "2024-10-01"
  },])
  const fetchEvents = async () => {
    try {
      const res = await api.get("/event/get");
      const allEvents = res.data.events;
      console.log(allEvents)
      setEvents(allEvents);
    } catch (error) {
      console.log(error.message);
    }
  };
const today = new Date(); // current date
const todayEventCount = events.filter(event => {
  const eventDate = new Date(event.eventdate); // parse event date
  return (
    eventDate.getFullYear() === today.getFullYear() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getDate() === today.getDate()
  );
}).length;

const upcomingEvents=events.filter((event)=>{
  return(
    event.status==="upcoming"
  )
}).length

const totalEvents=events.length;

console.log("Number of events today:", todayEventCount);
  return (
    <>
      <div className='w-[95%] min-h-[95%] bg-white rounded-2xl flex flex-col items-center '>
        {
          showModal &&
          <AddEventModal setShowmodal={setShowmodal} fetchEvents={fetchEvents}/>
        }
        <div className='w-[90%] min-h-[70%] shadow-2xl mt-10 px-10 rounded-2xl pb-10'>
          <div className='flex justify-between  pt-5 '>
            <div className='flex flex-col gap-4'>
              <h1 className='text-5xl font-bold'>Event Management</h1>
              <h3 className='text-2xl text-gray-600 font-semibold'>Manage and organize your event</h3>
            </div>
            <div>
              <button
                onClick={() => setShowmodal(true)}
                className='flex gap-5 bg-blue-500 py-3 px-5 rounded-2xl text-white font-semibold text-xl items-center '>
                <Plus className='font-bold' />
                <h1>Add New Event</h1>
              </button>
            </div>
          </div>
          <div className='mt-5 flex flex-col gap-4 width-full'>

            {/* //total events */}
            <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold text-blue-500'>Total Events</h3>
                <h1 className='text-4xl font-bold text-blue-700'>{totalEvents}</h1>
              </div>
              <div>
                <Calendar className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
              </div>
            </div>

            {/* //today events */}
            <div className='bg-green-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold text-green-500'>Today Events</h3>
                <h1 className='text-4xl font-bold text-green-700'>{todayEventCount}</h1>
              </div>
              <div>
                <CalendarCheck className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
              </div>
            </div>

            {/* //upcoming events */}
            <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold text-blue-500'>Upcoming Events</h3>
                <h1 className='text-4xl font-bold text-blue-700'>{upcomingEvents}</h1>
              </div>
              <div>
                <Clock1 className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
              </div>
            </div>

            {/* //total registration
            <div className='bg-green-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold text-green-500'>Total Regitrations</h3>
                <h1 className='text-4xl font-bold text-green-700'>3</h1>
              </div>
              <div>
                <Calendar className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
              </div>
            </div> */}

          </div>
        </div>
        <EventInfo fetchEvents={fetchEvents} events={events} />
      </div>

    </>
  )
}

export default Eventmanagement