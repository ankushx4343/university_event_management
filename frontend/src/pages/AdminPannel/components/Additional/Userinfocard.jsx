import { GraduationCap, ShieldCheckIcon, Trash2 } from 'lucide-react'
import React from 'react'

function Userinfocard({ user , handleDelete}) {
    return (
        <div className='bg-white rounded-2xl shadow-2xl px-4 py-4'>
            <div className='flex flex-col gap-3 relative'>
                <div className={`text-3xl font-bold px-5 py-3 rounded-xl border-5 m-2 bg-amber-50 w-fit ${user.role === "student" ? "border-green-500" : "border-purple-400"}`}>{user.firstname.charAt(0).toUpperCase()}</div>
                <div className='text-2xl font-bold ml-2'>{user.firstname.toUpperCase()}</div>
                <div className='text-xl text-gray-700 font-semibold ml-2'>{user.email}</div>
                <span className='ml-2 text-xl bg-gray-700 text-white w-fit px-4 py-2 rounded-xl'>{user.department}</span>
                {user.role === "admin"
                    ?
                    <div className='absolute top-5 right-5 bg-purple-600 text-white flex justify-center items-center gap-3 px-1 py-1 rounded-xl font-semibold'>
                        <ShieldCheckIcon />
                        <h1>Admin</h1>
                    </div>
                    :
                    <div className='absolute top-5 right-5 bg-green-600 text-white flex justify-center items-center gap-3 px-1 py-1 rounded-xl font-semibold'>
                        <GraduationCap />
                        <h1>Student</h1>
                    </div>
                }
            </div>

            {/* sepration line */}
            <div className='h-[1px] bg-gray-500 my-5'></div>
            <div>
                <div 
                onClick={()=>handleDelete(user._id)}
                className='bg-red-700/50 hover:bg-red-700 hover:cursor-pointer flex  items-center justify-center gap-5 p-2 text-white rounded-xl ml-2'>
                    <Trash2 className='scale-120' />
                    <h1 className='text-2xl font-semibold'>Delete</h1>
                </div>
            </div>
        </div>
    )
}

export default Userinfocard