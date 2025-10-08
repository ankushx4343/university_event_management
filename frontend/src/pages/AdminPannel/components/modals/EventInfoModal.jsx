import React, { useEffect, useRef } from 'react'

function EventInfoModal({ onClose, isOpen, event }) {
      const modalref=useRef()
      useEffect(() => {
          const handleClickOutside = (e) => {
              if (modalref.current && !modalref.current.contains(e.target)) {
                  onClose();
              }
          }
          if (isOpen) {
              document.addEventListener('mousedown', handleClickOutside)
          }
          return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [isOpen, onClose])
  
  if (!isOpen) {
    return null
  }
  return (
    <div  
      className='inset-0 fixed z-10 bg-black/10 backdrop-blur-md flex justify-center items-center'>
      <div  
      ref={modalref}
      className='bg-white rounded-xl px-5 py-8 relative'>
      </div>
    </div>
  )
}

export default EventInfoModal