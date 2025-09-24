import { Captions } from 'lucide-react'
import React from 'react'

function Inputbutton({title="Title",}) {
  return (
    <div className='w-full  h-16 relative group'>
        <h1 className='text-xl font-semibold'>{title}</h1>
        <div className='relative w-full h-full inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
    </div>
  )
}

export default Inputbutton