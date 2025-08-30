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
  useEffect(() => {
    const fetchevents = async () => {
      try {
        const res = await api.get("/event/get");
        console.log(res.data.events);
        setEvents(res.data.events);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchevents();
  }, [])

  useEffect(() => {
    if (events.length && user?.registeredEvents) {
      const filtered = events.filter((event) => user.registeredEvents.includes(event._id))
      setRegisteredEvents(filtered)
    }
  }, [events, user])

  const handleCardclick = (event) => {
    console.log(event)
    setSelectedevent(event);
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedevent(null);
  }
  return (
    <div className='bg-gray-300  w-screen'>
      <Header />
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
        />
      )}
    </div>
  )
}

export default Dashboard