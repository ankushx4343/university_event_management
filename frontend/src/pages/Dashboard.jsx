import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Card from '../components/events/Card'
import api from '../services/api';
import EventDesModal from '../components/events/EventDesModal';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent,setSelectedevent]=useState(null);
  const [isModalOpen,setIsModalOpen]=useState(false);
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

  const handleCardclick=(event)=>{
    console.log(event)
    setSelectedevent(event);
    setIsModalOpen(true)
  }

  const handleCloseModal=()=>{
    setIsModalOpen(false);
    setSelectedevent(null);
  }
  return (
    <div className='bg-gray-300 h-screen w-screen'>
      <Header />
      <div className='w-screen h-screen grid-cols-4 flex gap-4 mt-10 px-10'>
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
      <EventDesModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />  
    </div>
  )
}

export default Dashboard