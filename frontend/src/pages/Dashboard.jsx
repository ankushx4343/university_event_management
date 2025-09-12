import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Card from '../components/events/Card'
import api from '../services/api';
import EventDesModal from '../components/events/EventDesModal';
import { useContext } from 'react';
import { AuthContex } from '../context/AuthContext';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedevent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { user } = useContext(AuthContex);

  //fetches events and filter them 
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await api.get("/event/get");
      const allEvents = res.data.events;
      setEvents(allEvents);
       console.log(user)
      // Only filter if user and user.registeredEvents exist
      if (user?.registeredEvents) {
        console.log("hi")
        const registered = allEvents.filter(event => user.registeredEvents?.includes(event._id));
        setRegisteredEvents(registered);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (user) { // wait for user to exist
    fetchEvents();
  }
}, [user]); // run whenever user becomes available
  const handleCardclick = (event) => {
    console.log(event)
    setSelectedevent(event);
    setIsModalOpen(true)
  }

  //close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedevent(null);
  }

  //helps in showing changes on frontend intantly after user register for an event 
  const handleRegister=(event)=>{
    console.log("registered")
    console.log(registeredEvents)
    console.log(event)
    event.registereduser=[...event.registereduser,user._id]
    setRegisteredEvents((prev)=>{
      const updated=[...prev,event];
      console.log("updated inside set:",updated)
      return updated;
      })
  }

  //helps in showing changes on frontend intantly after user unregister for an event 
  const handleUnregister=(event)=>{
    console.log("unregistered")
    console.log(registeredEvents)
    event.registereduser=event.registereduser.filter((us)=>us!=user._id)
    setRegisteredEvents((prev)=>prev.filter(ev=>ev.id!==event.id)) 
    console.log(registeredEvents)
  }
    if (!user) {
    return <p>Loading user data...</p>;
  }
  return (
    <div className='bg-gray-300  w-screen'>
      <div className='mt-5 font-sans'>
        <div className='flex flex-col justify-center items-center font-bold text-3xl'>
          <h1>Your registered events</h1>
          <div className='w-full h-[2px] bg-black mt-2'></div>
        </div>
        <div className='w-screen grid grid-cols-4  gap-4 mt-10 px-10'>
          {
            events.length === 0 ? (
              <p>No event found</p>
            ) : (
              registeredEvents.map((event, index) => {
                return <Card key={index} event={event} onClick={handleCardclick}></Card>
              })
            )
          }
        </div>
        <div className='flex flex-col justify-center items-center font-bold text-3xl'>
          <h1>All events</h1>
          <div className='w-full h-[2px] bg-black mt-2'></div>
        </div>
      <div className='w-screen h-screen grid grid-cols-4  gap-4 mt-10 px-10'>
        {
          events.length === 0 ? (
            <p>No event found</p>
          ) : (
            events.map((event, index) => {
              console.log(event)
              return <Card key={index} event={event} onClick={handleCardclick}></Card>
            })
          )
        }
      </div>
      </div>
      {isModalOpen && selectedEvent && (
        <EventDesModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      )}
    </div>
  )
}

export default Dashboard