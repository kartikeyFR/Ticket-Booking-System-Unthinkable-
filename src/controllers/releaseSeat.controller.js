import { Seat } from "../models/seat.model.js";
import { Waitlist } from "../models/waitlist.model.js";
import { promoteNextInWaitlist } from "./waitlist.controller.js";

export const cancelBookingOrReleaseSeat = async (req, res) => {
    const { seatId, eventId, category } = req.body;

    try {
        
        const promotedEntry = await promoteNextInWaitlist(eventId, category);

        return res.status(200).json({
            success: true,
            message: "Seat released successfully.",
            promotedUser: promotedEntry ? promotedEntry.userId : "No one in waitlist"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const releaseSeatAndNotifyNext = async (req, res) => {
    const { seatId, eventId, category } = req.body;

    try {
        
        const seat = await Seat.findByIdAndUpdate(seatId, {
            status: 'available',
            heldBy: null,
            holdExpiresAt: null
        }, { new: true });

        if (!seat) {
            return res.status(404).json({ success: false, message: "Seat not found" });
        }

        
        const nextUser = await Waitlist.findOneAndUpdate(
            { eventId, category, status: 'waiting' },
            { $set: { status: 'notified' } },
            { sort: { createdAt: 1 }, new: true } 
        );

        return res.status(200).json({
            success: true,
            message: "Seat released successfully.",
            notifiedUser: nextUser ? nextUser.userId : "No one on the waitlist for this category."
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};