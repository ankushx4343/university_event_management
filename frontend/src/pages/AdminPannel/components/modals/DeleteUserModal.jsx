import { Trash2, TriangleAlert, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

function DeleteUserModal({user, isOpen, onClose, onConfirmdelete, loading = false }) {
    console.log(user)
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
    return (
        <div className='inset-0 fixed z-10 bg-black/50 backdrop-blur-md flex justify-center items-center '>
            <div ref={modalref} className='bg-white rounded-xl  py-8 relative w-[30%]'>
                <diiv className='flex  justify-between items-center px-8'>
                    <div className='flex items-center gap-10'>
                        <TriangleAlert className='text-red-600 scale-140' />
                        <h1 className='font-semibold text-2xl'>Delete User</h1>
                    </div>
                    <X 
                    onClick={onClose}
                    className=' text-gray-500 scale-120 hover:cursor-pointer' />
                </diiv>
                <div className='w-full bg-gray-300 h-[2px] my-5'></div>
                <div className='px-8'>
                    <h1 className='text-gray-500 text-xl p-3'>Are you sure do you want you delete this user?</h1>
                    <div className='bg-red-100 border-l-5 rounded-2xl px-4 border-red-700 py-8 font-semibold text-lg'>{user.firstname}{user.lastname}</div>
                </div>
                <div className='w-full bg-gray-300 h-[2px] my-5'></div>
                <div className='flex justify-end px-8 gap-4'>
                    <button 
                    onClick={onClose}
                    className='text-xl border-gray-600 border-2 rounded-2xl px-4 py-3 hover:cursor-pointer'>cancel</button>
                    <button 
                    onClick={onConfirmdelete}
                    className='flex gap-3 text-xl px-4 py-3 bg-red-600 text-white items-center rounded-2xl font-semibold hover:cursor-pointer'><Trash2/>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserModal