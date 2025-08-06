import mongoose from "mongoose";

const Event = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    description: String,
    eventdate: {
        type: Date,
        required: [true, "event date is required"]
    },
    eventtime: {
        type: String,
        required: [true, "event time is requiered"]
    },
    //registration management
    registrationdeadline: {
        type: Date,
        required: [true, "registration deadline is required"],
        validate: {
            validator: function (deadline) {
                return deadline <= this.eventdate;
            },
            message: "registration deadline must be before event date"
        }
    },
    location: {
        type: String,
        required: [true, "location is required"],
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, "capacity is required"],
        min: [1, "capacity must be at least 1"]
    },
    registereduser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    status: {
        type: String,
        enum: ['upcoming', 'registration-closed', 'full', 'completed'],
        default: 'upcoming'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
}
)
// Add this virtual field instead
Event.virtual('availableSeats').get(function () {
    return this.capacity - (this.registeredUsers ? this.registeredUsers.length : 0);
});

Event.pre('save', function (next) {

    //update status based on current condition

    //'this' refers to document being saved

    const now = new Date();
    if(now>this.eventdate){
        this.status='completed'
    }else if(now>this.registrationdeadline){
        this.status='registration-closed'
    }else if (this.registereduser.length>=this.capacity) {
        this.status='full'
    }else{
        this.status='upcoming'
    }
    next();
})

export default mongoose.model('Event',Event);