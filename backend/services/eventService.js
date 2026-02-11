import mongoose from "mongoose";
import Event from "../models/eventModel.js";
import AppError from "../utils/AppError.js";
import userModel from "../models/userModel.js";
import { createNotification } from "../controllers/notificationController.js";
import { sendEventRegistrationEmail } from "./emailservices.js";


export const createEventService = async (data, userId) => {
    const {
        title,
        description,
        eventdate,
        eventtime,
        registrationdeadline,
        location,
        capacity,
        category
    } = data
    if (
        !title ||
        !description ||
        !eventdate ||
        !eventtime ||
        !location ||
        !registrationdeadline ||
        !capacity ||
        !category
    ) {
        throw new AppError("all fields are required", 400)
    }

    //business rule validations
    const now = new Date();

    if (new Date(eventdate) <= now) {
        throw new AppError("event date must be in future", 400);
    }

    if (new Date(registrationdeadline) >= new Date(eventdate)) {
        throw new AppError("registration deadline must be before event date", 400);
    }
    if (capacity <= 0) {
        throw new AppError("capacity of the event must be greater than 0");
    }

    //create event
    const event = await Event.create({
        title,
        description,
        eventdate,
        eventtime,
        location,
        capacity,
        registrationdeadline,
        category,
        createdBy: userId
    })
    return event;
}

export const getAllEventsService = async () => {
    const events = await Event.find()
        .populate('createdBy', 'firstname lastname email _id')
        .populate('registereduser', 'firstname lastname email studentId department');
    return events;
}

export const getEventByIdService = async (event_id) => {
    if (!mongoose.Types.ObjectId.isValid(event_id)) {
        throw new AppError("event id is not valid", 400)
    }
    const event = await Event.findById(event_id);
    if (!event) {
        throw new AppError("event not found", 404);
    }
    return event;
}

export const registerForEventService = async (event_id, user_id) => {

    if (!mongoose.Types.ObjectId.isValid(event_id)) {
        throw new AppError("Invalid event Id", 400);
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const event = await Event.findById(event_id).session(session);
        const user = await userModel.findById(user_id).session(session);
        //Already registered for the event or not
        const alreadyRegistered = event.registereduser.includes(user_id);
        if (alreadyRegistered) {
            throw new AppError("you have already registered for the event", 409)
        }

        //capacity full toh nhi ho gyi hai 
        if (event.registereduser.length >= event.capacity) {
            throw new AppError("event is full registrations are full", 400);
        }

        const currentDate = new Date();
        if (currentDate > event.registrationdeadline) {
            throw new AppError("registration deadline has passed", 400);
        }

        //sbb validation pass- do registration
        //now the main work starts form here

        event.registereduser.push(user_id);
        user.registeredEvents.push(event_id)
        await event.save({ session })
        await user.save({ session })

        //notificaton create krte hai
        const notification = await createNotification(
            user_id,
            `user registered for the ${event.title} successfuly`,
            "registration_success",
            event_id,
            session
        )
        if (!notification) {
            throw new AppError("Error in creating notification", 400);
        }
        await session.commitTransaction();
        session.endSession()

        // 🆕 SEND CONFIRMATION EMAIL
        const emailResult = await sendEventRegistrationEmail(
            user.email,
            user.firstname,
            {
                title: event.title,
                date: event.eventdate,
                time: event.eventtime,
                venue: event.location
            }
        );

        if (!emailResult.success) {
            console.warn("failed to send confirmation email but registration for the event is completed");
            // Don't fail the registration if email fails
        }
        return event;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
}