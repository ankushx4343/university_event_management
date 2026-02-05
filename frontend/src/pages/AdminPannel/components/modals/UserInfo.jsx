import { Building2, Calendar, IdCard, Loader2, Mail, MapPin, User } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

function UserInfo({ isOpen, onClose, user, loading = true }) {

  const modalref = useRef();
  console.log(user)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalref.current && !modalref.current.contains(e.target)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])


  if (!isOpen) {
    return null
  }

  if (loading) {
    return (
      <div className='inset-0 fixed bg-black/50 backdrop-blur-md z-10 flex justify-center items-center'>
        <Loader2 className='scale-200 animate-spin' />
      </div>
    )
  }
  return (
    <div className='inset-0 fixed bg-black/50 backdrop-blur-md z-10 flex justify-center items-center'>
      <div ref={modalref} className='h-[90%] bg-white w-[40%] rounded-2xl p-7 '>
        <div className='overflow-y-scroll h-full w-full'>
          <div className='bg-slate-200/40 rounded-2xl p-5 flex flex-col gap-3'>
            <div className='text-4xl font-bold bg-amber-50-400 w-fit px-5 py-4 rounded-md border-2 border-green-500'>
              {user.firstname.split("")[0].toUpperCase()}
            </div>
            <div className='flex items-center gap-6 p-2'>
              <div className='text-blue-500 scale-120'>
                <User />
              </div>
              <div>
                <div className='text-md text-gray-700'>
                  Name
                </div>
                <div className='text-xl font-semibold'>
                  {user.firstname} {user.lastname}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-6 p-2 '>
              <div className='text-blue-500 scale-120'>
                <Mail />
              </div>
              <div>
                <div className='text-md text-gray-700'>
                  Email
                </div>
                <div className='text-xl font-semibold'>
                  {user.email}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-6 p-2'>
              <div className='text-blue-500 scale-120'>
                <Building2 />
              </div>
              <div>
                <div className='text-md text-gray-700'>
                  Department
                </div>
                <div className='text-xl font-semibold'>
                  {user.department}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-6 p-2'>
              <div className='text-blue-500 scale-120'>
                <IdCard />
              </div>
              <div>
                <div className='text-md text-gray-700'>
                  Student ID
                </div>
                <div className='text-xl font-semibold'>
                  {user.studentId}
                </div>
              </div>
            </div>


          </div>


          <div className='mt-10 '>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Registered Events ({user.registeredEvents?.length || 0})
            </h3>

            {user.registeredEvents && user.registeredEvents.length > 0 ? (
              <div className="space-y-3">
                {user.registeredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>

                    <div className="space-y-2 text-sm">
                      {event.eventdate && (
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {new Date(event.eventdate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}

                      {event.eventtime && (
                        <div className="flex items-center text-gray-600">
                          <div className="w-4 h-4 mr-2 flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                          </div>
                          <span>{event.eventtime}</span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event.status && (
                        <div className="mt-2">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming'
                              ? 'bg-green-100 text-green-700'
                              : event.status === 'completed'
                                ? 'bg-gray-100 text-gray-700'
                                : event.status === 'full'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg h-full">
                <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No events registered yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>


  )
}

export default UserInfo