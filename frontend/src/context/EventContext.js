import { Children, createContext, useContext, useState } from "react";

const EventContext=createContext();

export const EventProvider=({Children})=>{
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    const [eventToDelete,setEventToDelete]=useState(null);

    const openDeleteModal=(event)=>{
        setEventToDelete(event);
        setShowDeleteModal(true);
    }

    const closeDeleteModal=()=>{
        setEventToDelete(null);
        setShowDeleteModal(false);
    }

    const contextvalue={
        showDeleteModal,
        eventToDelete,
        openDeleteModal,
        closeDeleteModal
    }
    return(
        <EventContext.Provider value={contextvalue}>
            {Children}
        </EventContext.Provider>
    )}
    export const useEventContext=()=>{
        const context=useContext(EventContext);
        if(!context){
            throw new Error('useEventContext must be used within EventProvider');
        }
        return context;
    }
