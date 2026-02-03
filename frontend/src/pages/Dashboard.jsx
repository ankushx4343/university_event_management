import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Card from '../components/events/Card'
import api from '../services/api';
import EventDesModal from '../components/events/EventDesModal';
import { useContext } from 'react';
import { AuthContex } from '../context/AuthContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedevent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setactiveTab] = useState("all");
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

  const filterEvents = events.filter(event => {
    switch (activeTab) {
      case 'workshop':
        return event.category === "workshop";
      case 'seminar':
        return event.category === "seminar";
      case 'culture':
        return event.category === "culture";
      case 'sports':
        return event.category === "sports";
      case 'other':
        return event.category==="other"  
      case 'all':
        return event  
      default:
        return true;
    }
  })
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
  const handleRegister = (event) => {

    event.registereduser = [...event.registereduser, user._id]
    setRegisteredEvents((prev) => {
      const updated = [...prev, event];
      console.log("updated inside set:", updated)
      return updated;
    })
  }

  //helps in showing changes on frontend intantly after user unregister for an event 
  const handleUnregister = (event) => {
    event.registereduser = event.registereduser.filter((us) => us != user._id)
    setRegisteredEvents((prev) => prev.filter(ev => ev.id !== event.id))
  }
  if (!user) {
    return <p>Loading user data...</p>;
  }
  return (
    <div className='bg-gray-300  w-screen'>
      <div className='pt-15 font-sans'>
        <div className='bg-blue-700 text-white py-4  ml-7 px-3 rounded-2xl items-center font-bold text-2xl my-8 w-[30%]'>
          <h1>Your registered events ({registeredEvents.length})</h1>
        </div>
        <div className='w-screen grid grid-cols-3  gap-4 mt-10 px-10'>
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
        <div className='bg-blue-700 text-white py-4  ml-7 px-3 rounded-2xl items-center font-bold text-2xl my-8 w-[30%] flex justify-between items-center'>
          <h1>All events ({events.length})</h1>
          <Select
            value={activeTab}
            onValueChange={(value) =>
              setactiveTab(value)
            }
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>category</SelectLabel>
                <SelectItem value="workshop">workshop</SelectItem>
                <SelectItem value="seminar">seminar</SelectItem>
                <SelectItem value="cultural">cultural</SelectItem>
                <SelectItem value="sports">sports</SelectItem>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="other">other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='w-screen min-h-screen grid grid-cols-4  gap-10 mt-10 px-10'>
          {
            events.length === 0 ? (
              <p>No event found</p>
            ) : (
              filterEvents.map((event, index) => {
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