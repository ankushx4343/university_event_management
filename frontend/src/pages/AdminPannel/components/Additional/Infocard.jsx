import { Calendar1, Clock, Edit, FastForward, MapPin, Trash2, User2, Users } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../../../services/api'
import DeleteEventModal from '../modals/DeleteEventModal'
import toast from 'react-hot-toast';
import useAuth from '../../../../context/useAuth';
import EventInfoModal from '../modals/EventInfoModal';

function Infocard({event,fetchEvents,handleCardClick}) {
    const [showdeletemodal,setShowdeletemodal]=useState(false);
    const [loading,setLoading]=useState(false)
    const {user}=useAuth();
    const isCreatedByYou=user._id==event.createdBy
    const isComing=new Date(event.eventdate)>=new Date();
    console.log(event)
    const handleClick=(e)=>{
        e.stopPropagation(); 
        setShowdeletemodal(true)
    }
    const onClose=()=>{
        setShowdeletemodal(false);
    }
    const onConfirmDelete=async()=>{
         
        try {
            setLoading(true);
            await api.delete(`/event/delete/${event.id}`)
            setLoading(false)
            fetchEvents()
            toast.success("event deleted")
        } catch (error) {
            toast.error("error in deleting")
        }finally{
            setLoading(false)
            onClose
        }
    }
    if (!event) {
        return (
            <div>
                no event found
            </div>
        )
    }
    return (
        <div 
        onClick={()=>{handleCardClick(event)}}
        className='w-[90%] bg-white mt-5 p-5 rounded-2xl flex flex-col gap-2 shadow-2xl relative'>
            <div className='flex gap-4 items-center'>
                <h1 className='text-2xl font-semibold'>{event.title}</h1>
                {isComing &&
                <div className='text-green-800 bg-green-200 font-semibold px-2 py-1  rounded-2xl'>upcoming</div>
                }
                {isCreatedByYou &&  
                <div className='text-blue-800 bg-blue-200 font-semibold px-2 py-1  rounded-2xl'>created by you</div>
                }
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

            {/* edit and delete */}

            <div className='absolute top-5  right-3 flex items-center text-gray-500 gap-5 pr-4'>
                <div className='text-m hover:cursor-pointer'>
                    <Edit />
                </div>
                <div className='text-m hover:cursor-pointer'
                     onClick={handleClick}
                     >
                    <Trash2/>
                </div>
            </div>
            {/* <EventInfoModal/> */}
            {
                showdeletemodal &&
            <DeleteEventModal onClose={onClose} isOpen={showdeletemodal} loading={loading} evetTitle={event.title} onConfirmDelete={onConfirmDelete}/>
            }
        </div>
    )
}

export default Infocard