import { X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

function DeleteUserModal({ isOpen, onClose, onConfirmdelete, loading = false }) {

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
        <div className='inset-0 fixed z-10 bg-black/50 backdrop-blur-md flex justify-center items-center '>
            <div ref={modalref} className='bg-white rounded-xl px-5 py-8 relative'>
                <h1 className='text-2xl font-semibold'>Do you want to Delete <span className='text-blue-600 p-2 rounded-xl'>Ankush</span></h1>
                <div className='mt-5 flex justify-center gap-4 w-full'>
                    <button
                    onClick={onClose}
                    className='hover:cursor-pointer bg-gray-500 text-white font-semibold text-2xl px-4 py-2 rounded-xl'>
                        cancel
                    </button>
                    <button
                    onClick={onConfirmdelete}
                    className='hover:cursor-pointer bg-red-500 text-white font-semibold text-2xl px-4 py-2 rounded-xl'>
                        {loading?"deleting...":"delete"}
                    </button>
                </div>
                <div
                onClick={onClose}
                className='hover:cursor-pointer absolute -top-8 -right-4 p-1 bg-gray-500/50 backdrop-blur-2xl rounded-full'>
                    <X />
                </div>
            </div>
        </div>
    )
}

export default DeleteUserModal