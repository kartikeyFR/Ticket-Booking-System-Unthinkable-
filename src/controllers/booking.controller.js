import mongoose from "mongoose";
import { Seat } from "../models/seat.model.js";
import { Booking } from "../models/booking.model.js";
import QRCode from "qrcode";
import crypto from "crypto";

export const getUserTickets = async (req, res) => {
    const userId = req.user._id;

    try {
        
        const bookings = await Booking.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate("seatId")
            .sort({ createdAt: -1 }); 

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const confirmBooking = async (req, res) => {
    const { seatId, eventId, transactionId } = req.body;
    const userId=req.user._id;

    try {
        if (!transactionId) {
            return res.status(400).json({
                success: false,
                message: "Payment transaction ID is required to confirm booking."
            });
        }
        // Explicitly cast strings to ObjectIds for strict MongoDB matching
        const seat = await Seat.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(seatId),
                status: 'held',
                heldBy: new mongoose.Types.ObjectId(userId)
            },
            {
                $set: {
                    status: 'booked',
                    holdExpiresAt: null 
                }
            },
            { new: true }
        );

        if (!seat) {
            return res.status(400).json({
                success: false,
                message: "Seat hold has expired, already booked, or does not belong to you."
            });
        }

        // Generate unique ticket number and QR code payload
        const ticketNumber = `TKT-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
        const qrPayload = JSON.stringify({ ticketNumber, eventId, seatId, userId });
        
        // Generate QR code as a Base64 Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(qrPayload);

        // Save the booking record
        const newBooking = await Booking.create({
            eventId: new mongoose.Types.ObjectId(eventId),
            userId: new mongoose.Types.ObjectId(userId),
            seatId: new mongoose.Types.ObjectId(seatId),
            ticketNumber,
            qrCodeData: qrCodeDataUrl
        });

        return res.status(201).json({
            success: true,
            message: "Seat successfully booked and ticket generated!",
            ticketNumber,
            qrCode: qrCodeDataUrl,
            booking: newBooking
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};