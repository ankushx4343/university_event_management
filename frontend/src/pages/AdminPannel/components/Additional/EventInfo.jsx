import React, { useEffect, useState } from 'react'
import useAuth from '../../../../context/useAuth';
import api from '../../../../services/api';
import Infocard from './Infocard';

function EventInfo() {
    const { user } = useAuth();
    const [activeTab, setactiveTab] = useState("all");
    const [showdeletemodal, setShowdeletemodal] = useState(false);
    const [eventtodelete, setEventtodelete] = useState(null);
    const [events, setEvents] = useState([    {
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
    useEffect(() => {
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
        fetchEvents();
    }, [])
    
    const filterEvents=events.filter(event=>{
        switch(activeTab){
            case 'my-events':
                return event.createdBy===user._id;
            case 'other-events':
                return event.createdBy!==user._id;
            case 'upcoming':
                return event.status==='upcoming';
            case 'completed':
                return event.status==='completed';  
            default:
                return true;              
        }
    })
    const tabs = [
        {key: "all", label: "All events", count: events.length },
        {key:"my-events",label:"My Events",count:events.filter(e=>e.createdBy===user._id).length},
        {key:"other-events",label:"Other-Events",count:events.filter(e=>e.createdBy!==user._id).length},
        {key:"upcoming",label:"Upcoming",count:events.filter((e)=>e.status==="upcoming").length},
        {key:"completed",label:"Completed",count:events.filter((e)=>e.status==="completed").length}
    ]
    return (
        <div className='min-h-screen w-full z-0 mt-10 bg-gray-100 pt-10 px-5 flex flex-col items-center'>
            <div className='w-[90%] bg-white shadow-2xl rounded-2xl p-4 flex gap-2'>
                {tabs.map((tab)=>(
                    <button
                        onClick={()=>setactiveTab(tab.key)}
                        className={`text-xl px-4 py-2 font-semibold border-b-2 transition-colors hover:cursor-pointer duration-300 ease-in-out ${
                            activeTab===tab.key
                            ?'border-blue-500 text-blue-600'
                            :'border-transparent text-gray-600 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}({tab.count})
                    </button>
                ))}
            </div>
            
            {filterEvents.map((event)=>(
                <Infocard event={event}/>
            ))}
        </div>
    )
}

export default EventInfo