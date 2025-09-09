import React from 'react'

function Sidebar() {
  return (
    <div className='bg-white w-full h-full '>
        <div className='pt-20 flex flex-col justify-center align-center'>
            <h1 className='text-blue-600 text-3xl font-bold text-center'>EventAdmin</h1>
            <h2 className='text-gray-500 text-center mt-4 text-xl'>universitymanagement</h2>
        </div>
        <div>
            <button className='flex flex-col'>
                <div></div>
                <div></div>
            </button>
        </div>
    </div>
  )
}

export default Sidebar