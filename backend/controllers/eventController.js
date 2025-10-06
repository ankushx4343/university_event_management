import mongoose, { mongo } from "mongoose";
import Event from "../models/eventModel.js"
import { createNotification } from "./notificationController.js";
import userModel from "../models/userModel.js";

//creating event
export const createEvent = async (req, res) => {
    try {
        const { title, description, eventdate, eventtime, registrationdeadline, location, capacity } = req.body;
        if (!title || !description || !eventdate || !eventtime || !registrationdeadline || !location || !capacity) {
            return res.status(400).json({
                success: false,
                msg: "all fields are required"
            })
        }
        const event = await Event.create({
            title,
            description,
            eventdate,
            eventtime,
            registrationdeadline,
            location,
            capacity,
            createdBy: req.user._id
        })

        if (!event) {
            return res.status(500).json({
                success: false,
                msg: "internal server error"
            })
        }
        return res.status(201).json({
            success: true,
            msg: "event created successfully",
            event: event
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

//getting all events
export const getAllEvent = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({
            success: true,
            msg: "event fetched successfully",
            events: events
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal server error while fetching events",
            error: error.message
        })
    }

}

//get event by its id
export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                msg: "invalid event id"
            })
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                msg: "event not found"
            })
        }
        return res.status(200).json({
            success: true,
            event: event
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "internal server error",
            error: error.message
        })
    }
}

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

        const { title, description, eventdate, eventtime, registrationdeadline, location, capacity } = req.body;
        event.title = title || event.title;
        event.description = description || event.description;
        event.eventdate = eventdate || event.eventdate;
        event.eventtime = eventtime || event.eventtime;
        event.registrationdeadline = registrationdeadline || event.registrationdeadline;
        event.location = location || event.location;
        event.capacity = capacity || event.capacity;

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
            .select('title eventdate location capacity registereduser')
    

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
                registeredUsers: event.registereduser
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
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        //Event find kro
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                msg: "invalid event id"
            })
        }
        const event = await Event.findById(eventId);
        const user = await userModel.findById(userId);
        //Already registered for the event or not
        const alreadyRegistered = event.registereduser.includes(userId);
        if (alreadyRegistered) {
            return res.status(400).json({
                success: false,
                msg: "you have already registered for the event"
            })
        }

        //capacity full toh nhi ho gyi hai 
        if (event.registereduser.length >= event.capacity) {
            return res.status(400).json({
                success: false,
                msg: "event is full registrations are full"
            })
        }

        const currentDate = new Date();
        if (currentDate > event.registrationdeadline) {
            return res.status(400).json({
                success: false,
                msg: "registration deadline has passed"
            })
        }

        //sbb validation pass- do registration
        //now the main work starts form here

        event.registereduser.push(userId);
        await event.save();

        user.registeredEvents.push(eventId)
        await user.save()
        //notificaton create krte hai
        const notification = await createNotification(
            userId,
            `user registered for the ${event.title} successfuly`,
            "registration_success",
            eventId
        )
        if (!notification) {
            return res.status(400).json({
                success: false,
                msg: "error in creating notification"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "successfully registered for the event",
            data: {
                eventTitle: event.title,
                registrationCount: event.registereduser.length,
                availableSeats: event.capacity - event.registereduser.length
            }
        })
    } catch (error) {
        console.error("registration error:", error);
        res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
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
        const notification = await createNotification(
            userId,
            `user unregistered for the ${event.title}`,
            "registration_canceled",
            eventId
        )
        if (!notification) {
            return res.status(400).json({
                success: false,
                msg: "error in creating notifications"
            })
        }
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
            data: {
                event
            }
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