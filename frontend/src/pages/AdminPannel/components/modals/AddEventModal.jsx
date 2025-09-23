import React from 'react'

function AddEventModal({setShowmodal}) {
  return (
    <div className='h-screen w-screen z-30 bg-black/40 backdrop-blur-2xl absolute top-0  left-0 flex justify-center items-center'>
        <div className='bg-black/40 min-h-[80%] w-[40%] rounded-2xl backdrop-blur-3xl py-10 px-4'>
            <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="description" className="text-2xl font-sans">
                    description
                </lable>
                <input 
                    id='description'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>

                        <div className='flex flex-col justify-center text-white px-2 py-1 gap-3'>
                <lable htmlFor="title" className="text-2xl font-sans">
                    Title
                </lable>
                <input 
                    id='title'
                    type='text'
                    className='backdrop-blur-6xl bg-white/20 rounded-md h-14 cursor-pointer px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200 hover:bg-white/40'></input>

            </div>
        </div>
    </div>
  )
}

export default AddEventModal