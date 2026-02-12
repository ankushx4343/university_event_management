import mongoose, { mongo } from "mongoose";
import Event from "../models/eventModel.js"
import { createNotification } from "./notificationController.js";
import userModel from "../models/userModel.js";
import {sendEventRegistrationEmail, sendEventReminderEmail} from '../services/emailservices.js'
import { createEventService, getAllEventsService, getEventByIdService, registerForEventService } from "../services/eventService.js";
import {catchAsync} from "../utils/catchAsync.js";

//creating event
export const createEvent = catchAsync(async (req, res) => {
    const event=await createEventService(req.body,req.user._id);
    return res.status(201).json({
        success:true,
        message:"event created successfully",
        event
    })
})

//getting all events
export const getAllEvent = catchAsync(async (req, res) => {
        const events=await getAllEventsService();
        return res.status(200).json({
            success: true,
            msg: "event fetched successfully",
            events: events
        })
})

//get event by its id
export const getEventById = catchAsync(async (req, res) => {
        const eventId = req.params.id
        const event=await getEventByIdService(eventId);
        return res.status(200).json({
            success: true,
            event: event
        })
})

//update event
export const updateEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid event id"
            })
        }
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(400).json({
                success: false,
                msg: "event does not exists"
            })
        }
        console.log(userId.toString())
        console.log(event.createdBy.toString())

        if (userId.toString() !== event.createdBy.toString()) {
            return res.status(400).json({
                success: false,
                msg: "you can not update this event"
            })
        }

        const { title, description, eventdate, eventtime, registrationdeadline, location, capacity,category } = req.body;
        event.title = title || event.title;
        event.description = description || event.description;
        event.eventdate = eventdate || event.eventdate;
        event.eventtime = eventtime || event.eventtime;
        event.registrationdeadline = registrationdeadline || event.registrationdeadline;
        event.location = location || event.location;
        event.capacity = capacity || event.capacity;
        event.category=category || event.category;
        
        event.save();
        return res.status(200).json({
            success: true,
            msg: "event updated successfuly",
            event
        })
    } catch (error) {
        console.log("error in event updation :", error.message);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }

}

//Delete event
export const deleteEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                success: false,
                msg: "Event not found"
            })
        }
        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(400).json({
                success: false,
                msg: "you are not allowed to delete this event"
            })
        }

        const eventt = await Event.findByIdAndDelete(eventId);
        return res.status(200).json({
            success: true,
            msg: "event deleted successfully",
            event: eventt
        })


    } catch (error) {
        console.log("error in deleting an event:", error.message);
        return res.status(500).json({
            success: false,
            msg: "Internal server error",
        })
    }
}

//count upcoming events
export const countUpcomingEvents = async (req, res) => {
    try {
        const date = new Date();
        const count = await Event.countDocuments({
            eventdate: { $gt: date }
        })
        res.status(200).json({
            success: true,
            msg: "successfully fetched the count of upcoming events",
            count: count
        })
    } catch (error) {
        console.log("error in counting the events", error.message)
        res.status(500).json({
            success: false,
            msg: "Internal sever error",
        })
    }
}

//count todays events
export const countTodaysEvents = async (req, res) => {
    try {
        const date = new Date();
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999))
        const count = await Event.countDocuments({
            eventdate: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        })
        res.status(200).json({
            success: true,
            msg: "today events fetched successfully",
            count: count
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "internal server error",
            error: error.message
        })
    }
}

//give registered users in an event with provided just with the event id
export const registeredUsers = async (req, res) => {
    try {
        
        const id = req.params.eventId
        const event = await Event.findById(id)
            .populate('registereduser', 'firstname lastname email department')
            .select('title eventdate location capacity registereduser availableSeats')
    

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                eventTitle: event.title,
                eventDate: event.eventdate,
                location: event.location,
                capacity: event.capacity,
                registeredCount: event.registereduser.length,
                registeredUsers: event.registereduser,
                availableSeats:event.availableSeats
            }
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching registrations'
        });
    }
}


//Now for user 
//registerForEvent
export const registerForEvent = async (req, res) => {
        const eventId = req.params.id;
        const userId = req.user.id;
        const event=await registerForEventService(eventId,userId);
        return res.status(200).json({
            success: true,
            msg: "successfully registered for the event",
            event,
            data: {
                eventTitle: event.title,
                registrationCount: event.registereduser.length,
                availableSeats: event.capacity - event.registereduser.length
            }
        })
}

//unregisterForEvent
export const unregisterForEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
        const user = await userModel.findById(userId);
        if (!event) {
            return res.status(400).json({
                success: false,
                msg: "event do not exist"
            })
        }
        const date = new Date();
        if (event.eventdate < date) {
            return res.status(400).json({
                success: true,
                msg: "event is passed you can not unregister",
            })
        }
        //now unregister from event
        console.log("UserId to remove:", userId.toString());
        console.log("Before filtering:", event.registereduser.map(u => u.toString()));
        event.registereduser = event.registereduser.filter(user => {
            return user.toString() !== userId.toString();
        });
        console.log("After filtering:", event.registereduser.map(u => u.toString()));
        await event.save();

        //notification creation
        // const notification = await createNotification(
        //     userId,
        //     `user unregistered for the ${event.title}`,
        //     "registration_canceled",
        //     eventId
        // )
        // if (!notification) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "error in creating notifications"
        //     })
        // }
        const indexOfEvent = user.registeredEvents.indexOf(eventId)
        console.log(indexOfEvent);
        console.log(user.registeredEvents)
        if (indexOfEvent > -1) {
            user.registeredEvents.splice(indexOfEvent, 1);
        }
        await user.save();
        return res.status(200).json({
            success: true,
            msg: "successfuly unregistered to the event",
            event
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            msg: "internal server error",
            error: error.message
        })
    }
}

//send email reminder
export const sendEventReminders = async (req, res) => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

        // Find events happening tomorrow
        const upcomingEvents = await Event.find({
            eventdate: {
                $gte: tomorrow,
                $lt: dayAfterTomorrow
            }
        }).populate('registereduser', 'email firstname');

        if (upcomingEvents.length === 0) {
            return res.status(200).json({
                success: true,
                msg: "No events tomorrow, no reminders to send"
            });
        }

        let emailsSent = 0;
        let emailsFailed = 0;

        // Send reminder to each registered user
        for (const event of upcomingEvents) {
            for (const user of event.registereduser) {
                const emailResult = await sendEventReminderEmail(
                    user.email,
                    user.firstname,
                    {
                        title: event.title,
                        date: event.eventdate,
                        time: event.eventtime,
                        venue: event.location
                    }
                );

                if (emailResult.success) {
                    emailsSent++;
                } else {
                    emailsFailed++;
                }
            }
        }

        return res.status(200).json({
            success: true,
            msg: "Reminders sent successfully",
            data: {
                eventsFound: upcomingEvents.length,
                emailsSent,
                emailsFailed
            }
        });

    } catch (error) {
        console.error("Error sending reminders:", error);
        res.status(500).json({
            success: false,
            msg: "Failed to send reminders"
        });
    }
};