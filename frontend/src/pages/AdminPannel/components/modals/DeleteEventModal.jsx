import { Trash2, TriangleAlert, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function DeleteEventModal({isOpen,onClose,evetTitle,onConfirmDelete,loading=false}) {
 const modalRef=useRef();

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if(modalRef.current && !modalRef.current.contains(e.target)){
        onClose();  
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown',handleClickOutside)
    }
    return ()=>document.removeEventListener('mousedown',handleClickOutside)
  },[isOpen,onClose])
  if(!isOpen){
    return null;
  }

  return (
   <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-md flex justify-center items-center font-sans tracking-tight">
      <div ref={modalRef} className="bg-white py-8 rounded-xl w-140">
        <div className='flex justify-between items-center gap-4 px-6'>
          <div className='flex items-center gap-10'>
            <TriangleAlert className='text-red-600 scale-150'></TriangleAlert>
            <h1 className='text-xl font-semibold'>Delete Event</h1>
          </div>
          <X onClick={onClose} className='text-gray-400 scale-150 hover:cursor-pointer'></X>
        </div>
        <div className='w-full bg-gray-300 h-[2px] my-5'></div>
        <div className='px-6'>
          <div className='mt-4'>
            <h3 className='text-xl text-gray-500'>Are you sure do you want to delete this event?</h3>
          </div>
          <div className='mt-4 w-full overflow-clip py-8 bg-red-100 border-red-500 border-l-5 rounded-2xl text-md font-semibold'>
            {evetTitle}
          </div>
        </div>
        <div className='w-full bg-gray-300 h-[2px] my-5'></div>
        <div className='px-6 flex gap-4 justify-end '>
          <button
          onClick={onClose} 
          className='px-4 py-3 text-gray-700 text-xl font-semibold rounded-2xl border-2 border-gray-400 hover:cursor-pointer'>
            cancel
          </button>
          <button 
          onClick={onConfirmDelete}
          className='text-white bg-red-500 rounded-2xl flex gap-3 items-center px-3 py-3 hover:cursor-pointer'>
            <Trash2 className='scale-100'></Trash2>
            <h2 className='font-semibold text-xl'> {!loading ? <div>
                Delete Event
            </div> :<div> Deleting....</div> }</h2>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteEventModal