import { Seat } from "../models/seat.model.js";
import mongoose from "mongoose";

export const holdSeat = async (req, res) => {
    const { seatId, userId } = req.body;
    const TEN_MINUTES = 10 * 60 * 1000;

    try {
        
        const seat = await Seat.findOneAndUpdate(
            {
                _id: seatId,
                $or: [
                    { status: 'available' },
                    { status: 'held', holdExpiresAt: { $lt: new Date() } } // Expired reclamation
                ]
            },
            {
                $set: {
                    status: 'held',
                    heldBy: userId,
                    holdExpiresAt: new Date(Date.now() + TEN_MINUTES)
                }
            },
            { new: true }
        );

        
        if (!seat) {
            return res.status(409).json({
                success: false,
                message: "Seat is already booked or currently held by another user."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Seat successfully held for 10 minutes.",
            seat
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
