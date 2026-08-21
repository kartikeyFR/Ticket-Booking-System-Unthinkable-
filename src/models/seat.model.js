import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    seatNumber: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        enum: ['Premium', 'Standard'],
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'held', 'booked'],
        default: 'available'
    },
    heldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        default: null
    },
    holdExpiresAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export const Seat = mongoose.model("Seat", seatSchema);