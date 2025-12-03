import React, { useEffect, useRef, useState } from 'react'
import { Calendar1Icon, Captions, Clock2, MapPin, SquareMinus, Users2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../../../services/api';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

function AddEventModal({ onClose, isOpen, fetchEvents }) {
    const [loading, setLoading] = useState(false);
    const [formdata, setformData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        deadline: "",
        location: "",
        capacity: 0
    })
    const modalRef = useRef();
    useEffect(() => {
        const handleClickOutside=(e)=> {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose])
    if (!isOpen) {
        return null;
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }




    const handleSubmit = async () => {
        console.log(formdata)
        try {
            setLoading(true);
            const response = await api.post("/event/create", {
                "title": formdata.title,
                "description": formdata.description,
                "eventdate": formdata.date,
                "eventtime": formdata.time,
                "registrationdeadline": formdata.deadline,
                "location": formdata.location,
                "capacity": formdata.capacity
            })
            //  console.log(response)
            if (response.data.success) {
                toast.success("Event created")

            } else {
                toast.error(response)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setLoading(false)
            fetchEvents();
        }

    }

    return (
        // <div className='fixed inset-0 z-30 bg-black/40 backdrop-blur-md  top-0  left-0 flex justify-center items-center font-mono tracking-tight'>
        //     <div className='bg-black/40 min-h-[80%] w-[40%] rounded-2xl backdrop-blur-3xl py-10 px-4'>
        //     <X 
        //         onClick={()=>setShowmodal(false)}
        //         className='absolute top-5 right-5 text-white'/>
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="title" className="text-2xl ">
        //                 Title
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <SquareMinus className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='title'
        //                     name='title'
        //                     value={formdata.title}
        //                     onChange={handleChange}
        //                     type='text'
        //                     placeholder='Enter title of the event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
        //                     ></input>
        //             </div>
        //         </div>

        //         {/* description */}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="description" className="text-2xl ">
        //                 Description
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <Captions className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='description'
        //                     name='description'
        //                     type='text'
        //                     value={formdata.description}
        //                     onChange={handleChange}
        //                     placeholder='Enter description for the event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
        //                     ></input>
        //             </div>
        //         </div>

        //         {/* Event Date*/}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="eventdate" className="text-2xl ">
        //                 Date
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <Calendar1Icon className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='eventdate'
        //                     name='date'
        //                     type='date'
        //                     value={formdata.date}
        //                     onChange={handleChange}
        //                     placeholder='Enter title of the event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 '
        //                     ></input>
        //             </div>
        //         </div>


        //         {/*Event time */}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="time" className="text-2xl ">
        //                 Time
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <Clock2 className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='time'
        //                     name='time'
        //                     type='time'
        //                     value={formdata.time}
        //                     onChange={handleChange}
        //                     placeholder='Enter time for event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10  '
        //                     ></input>
        //             </div>
        //         </div>


        //         {/* registration deadline*/}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="deadline" className="text-2xl ">
        //                 deadline
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40  flex items-center'>      
        //                 <Calendar1Icon className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='deadline'
        //                     name='deadline'
        //                     type='date'
        //                     value={formdata.deadline}
        //                     onChange={handleChange}
        //                     placeholder='Enter title of the event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10'
        //                     ></input>
        //             </div>
        //         </div>


        //         {/* location*/}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="location" className="text-2xl ">
        //                 Location
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <MapPin className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='location'
        //                     name='location'
        //                     type='text'
        //                     value={formdata.location}
        //                     onChange={handleChange}
        //                     placeholder='enter location for event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
        //                     ></input>
        //             </div>
        //         </div>


        //         {/*capacity*/}
        //         <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
        //             <label htmlFor="capacity" className="text-2xl ">
        //                 Capacity
        //             </label>
        //             <div className='relative backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40 flex items-center'>      
        //                 <Users2 className='pl-3 absolute left-0 scale-190'/> 
        //                 <input 
        //                     id='capacity'
        //                     name='capacity'
        //                     type='number'
        //                     value={formdata.capacity}
        //                     onChange={handleChange}
        //                     placeholder='Enter title of the event'
        //                     className='rounded-md pl-16 px-4 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-/10 flex items-center'
        //                     ></input>
        //             </div>
        //         </div>

        //         <button onClick={handleSubmit} className='bg-blue-500/50 backdrop-blur-3xl h-10 px-5 rounded-2xl text-white font-semibold text-2xl mt-5'>
        //             {loading?"Submiting.....":"submit"}
        //         </button>
        //     </div>
        // </div>
        <div className='fixed inset-0 z-30 bg-black/40 backdrop-blur-md  top-0  left-0 flex justify-center items-center font-mono tracking-tight'>
            <div ref={modalRef} className='w-[20%]'>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Event</CardTitle>
                        <CardDescription>Enter your Event details below </CardDescription>
                        <CardAction>

                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id='title'
                                        name='title'
                                        value={formdata.title}
                                        onChange={handleChange}
                                        type='text'
                                        placeholder='Enter title of the event'
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">description</Label>
                                    <Input
                                        id='description'
                                        name='description'
                                        type='text'
                                        value={formdata.description}
                                        onChange={handleChange}
                                        placeholder='Enter description for the event'
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="eventdate">eventdate</Label>
                                    <Input
                                        id='eventdate'
                                        name='date'
                                        type='date'
                                        value={formdata.date}
                                        onChange={handleChange}
                                        placeholder='Enter title of the event'
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="time">time</Label>
                                    <Input
                                        id='time'
                                        name='time'
                                        type='time'
                                        value={formdata.time}
                                        onChange={handleChange}
                                        placeholder='Enter time for event'
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="deadline">deadline</Label>
                                    <Input
                                        id='deadline'
                                        name='deadline'
                                        type='date'
                                        value={formdata.deadline}
                                        onChange={handleChange}
                                        placeholder='Enter title of the event'
                                        required
                                    />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="location">location</Label>
                                    <Input
                                        id='location'
                                        name='location'
                                        type='text'
                                        value={formdata.location}
                                        onChange={handleChange}
                                        placeholder='enter location for event'
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="capacity">capacity</Label>
                                    <Input
                                        id='capacity'
                                        name='capacity'
                                        type='number'
                                        value={formdata.capacity}
                                        onChange={handleChange}
                                        placeholder='Enter title of the event'
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={handleSubmit} >
                            {loading?"Submiting.....":"submit"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AddEventModal