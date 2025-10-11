import { X, Calendar, MapPin, Users, Clock, UserCheck, AlertCircle, Building2, Mail, Users2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

function EventInfoModal({ onClose, isOpen, event }) {
  console.log(event)
  const modalref = useRef()
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

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "full":
        return "bg-red-100 text-red-100";
      case "registration-closed":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  }
  return (
    <div
      className='inset-0 fixed z-10 bg-black/10 backdrop-blur-md flex justify-center items-center'>
      <div
        ref={modalref}
        className='bg-white rounded-xl px-5 py-8 relative h-[80%] w-[50%] overflow-y-scroll'>
        <div className='flex flex-col gap-6 bg-gray-100 p-5 rounded-xl'>
          <h1 className='font-bold text-4xl'>{event.title}</h1>
          <span className={`inline-block w-fit scale-120 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', ' ') : 'N/A'}
          </span>
          <div className='text-gray-600 text-xl'>{event.description}</div>
          <div className='flex flex-col gap-4'>
            <div className='text-md flex items-center gap-4'>
              <Calendar className='text-blue-600 scale-120' />
              <div className='text-lg'>
                <h3 className='text-gray-500'>Event Date</h3>
                <h4 className='font-semibold'>{
                  new Date(event.eventdate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }</h4>
              </div>
            </div>
            <div className='text-md flex items-center gap-4'>
              <Clock className='text-blue-600 scale-120' />
              <div className='text-lg'>
                <h3 className='text-gray-500'>Time</h3>
                <h4 className='font-semibold'>
                  {event.eventtime}
                </h4>
              </div>
            </div>
            <div className='text-md flex items-center gap-4'>
              <MapPin className='text-blue-600 scale-120' />
              <div className='text-lg'>
                <h3 className='text-gray-500'>Location</h3>
                <h4 className='font-semibold'>
                  {event.location}
                </h4>
              </div>
            </div>
            <div className='text-md flex items-center gap-4'>
              <Users className='text-blue-600 scale-120' />
              <div className='text-lg'>
                <h3 className='text-gray-500'>Capacity</h3>
                <h4 className='font-semibold'>
                  {event.registereduser.length}/{event.capacity}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className='p-6 flex flex-col gap-5 bg-blue-100 rounded-2xl mt-4'>
          <div className='flex gap-2 pl-2'>
            <UserCheck />
            <h1 className='font-semibold text-xl'>Created By</h1>
          </div>
          <div className='flex items-center gap-5'>
            <span className='bg-blue-600 text-xl font-bold text-white p-3 rounded-full'>{event?.createdBy?.firstname.charAt(0).toUpperCase()}{event?.createdBy?.lastname.charAt(0).toUpperCase()}</span>
            <div>
              <h3 className='text-lg font-semibold'>{event.createdBy?.firstname} {event.createdBy?.lastname}</h3>
              <h4 className='text-gray-700'>{event.createdBy?.email}</h4>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 mt-3'>
          <h1 className='text-3xl  bold flex gap-4 items-center  p-3'>
            <Users2></Users2>
            Registered student({event.registereduser?.length})
          </h1>
          {event?.registereduser && event.registereduser.length > 0 ? (
            <div className="space-y-3">
              {event.registereduser.map((student, index) => (
                <div
                  key={student._id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-center justify-between">
                    {/* Avatar + Student Info */}
                    <div className="flex items-center space-x-4">
                      {/* Avatar Circle */}
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.firstname && student.lastname
                            ? `${student.firstname.charAt(0)}${student.lastname.charAt(0)}`
                            : 'S'}
                        </span>
                      </div>

                      {/* Student Details */}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {student.firstname} {student.lastname}
                        </p>

                        {/* Email + Department */}
                        <div className="flex items-center flex-wrap space-x-4 mt-1">
                          {student.email && (
                            <span className="text-sm text-gray-600 flex items-center">
                              <Mail size={14} className="mr-1" />
                              {student.email}
                            </span>
                          )}

                          {student.department && (
                            <span className="text-sm text-gray-600 flex items-center">
                              <Building2 size={14} className="mr-1" />
                              {student.department}
                            </span>
                          )}
                        </div>

                        {/* Student ID */}
                        {student.studentId && (
                          <span className="text-xs text-gray-500 mt-1 inline-block">
                            ID: {student.studentId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rank/Index */}
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-2">No students registered yet.</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default EventInfoModal